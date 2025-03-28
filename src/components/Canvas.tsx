import { CanvasProps, Field } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import { DraggableData, DraggableEvent } from 'react-draggable';
import { BiText } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useWindowSize } from '@react-hook/window-size'
import { extensions } from "@/constants";
import { Button } from "./ui/button";
import axios from "axios";
import { EditorProvider } from "./CustomEditorContext";
import { useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';
import { io } from "socket.io-client";
import { useDebouncedCallback } from 'use-debounce';

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function Canvas({ src, alt, slideId, fields, role } : CanvasProps) {
    const presentationId = useParams().presentationId
    const [localFields, setLocalFields] = useState<Field[]>(fields);
    const [selectedId, setSelectedId] = useState('');

    const handleSelectedId = (id: string) => {
        setSelectedId(id)
    }

    const handleAddField = async () => {
        const newField = { id: uuidv4(), content: '<p>Add Text</p>', position: { x: 100, y: 300 } };
        try {
            await axios.post(`${apiUrl}/presentations/${presentationId}/slides/${slideId}/fields`, newField)
            setLocalFields((prevFields) => [...prevFields, newField]);
            socket.emit('updateField', { slideId, fieldId: newField.id, updatedField: newField });
        } catch (error) {
            console.error('Error adding field:', error);
        }
    }
    
    const handleDeleteField = async () => {
        try {
            await axios.delete(`${apiUrl}/presentations/${presentationId}/slides/${slideId}/fields/${selectedId}`)
            setLocalFields((prevFields) => prevFields.filter((field) => field.id !== selectedId));
            socket.emit('updateField', { slideId, fieldId: selectedId, updatedField: null });
            setSelectedId('');
        } catch (error) {
            console.error('Error deleting field:', error);
        }
    }

    const handleUpdateField = async (id: string, updatedField: Field) => {
        setLocalFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, content: updatedField.content, position: updatedField.position } : field
            )
        );
        try {
            await axios.put(`${apiUrl}/presentations/${presentationId}/slides/${slideId}/fields/${id}`, updatedField);
            socket.emit('updateField', { slideId, fieldId: id, updatedField })
        } catch (error) {
            console.error('Error updating fields:', error);
        }
    }

    const debouncedUpdateField = useDebouncedCallback((id: string, updatedField: Field) => {
        handleUpdateField(id, updatedField);
    }, 300);

    const handleDrag = async (id: string, _: DraggableEvent, data: DraggableData) => {
        const field = localFields.find(f => f.id === id); 
        const updatedField = {...field, position: { x: data.x, y: data.y }}
        setLocalFields((prevFields) =>
            prevFields.map((field) =>
                field.id === id ? { ...field, position: updatedField.position } : field
            )
        );
        try {
            await axios.put(`${apiUrl}/presentations/${presentationId}/slides/${slideId}/fields/${id}`, updatedField);
            socket.emit('updateField', { slideId, fieldId: id, updatedField })
        } catch (error) {
            console.error('Error updating fields:', error);
        }
    };

    
    useEffect(() => {
        // Rerender local fields upon slideId change 
        setLocalFields(fields)
        // Listen for updates from other clients
        socket.on('fieldUpdated', ({ slideId: updatedSlideId, fieldId, updatedField }) => {
            if (slideId === updatedSlideId) {
                setLocalFields((prevFields) => {
                    if (updatedField === null) {
                        // Handle field deletion
                        return prevFields.filter((field) => field.id !== fieldId);
                    } else {
                        // Handle field addition or update
                        const existingField = prevFields.find((field) => field.id === fieldId);
                        if (existingField) {
                            // Update the existing field
                            return prevFields.map((field) =>
                                field.id === fieldId ? { ...field, ...updatedField } : field
                            );
                        } else {
                            // Add the new field
                            return [...prevFields, updatedField];
                        }
                    }
                });
            }
        });
    
        return () => {
            socket.off('fieldUpdated');
        };
    }, [slideId]);

    ////////////////////
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    const [width, height] = useWindowSize()
    const slideRef=useRef<HTMLDivElement>(null)


    useEffect(() => {
        if (slideRef.current) {
            setSlideSize({
                width: slideRef.current.offsetWidth,
                height: slideRef.current.offsetHeight,
            });
        }
    }, [ width, height]);


    const bounds = {
        left: 0, 
        top: 0, 
        right: slideSize.width, 
        bottom: slideSize.height
    }
    //////////////////////
    return (
        <div ref={slideRef} className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip border-2">
            {role !== 'viewer' && (
                <div className="relative top-0 py-2 pl-2 flex gap-2 border-b-2 z-40 w-[100px]">
                    <Button variant={'outline'} className=" z-50 cursor-pointer text-white" onClick={handleAddField}>
                        <BiText className="text-black" />
                    </Button>
                    <Button className="cursor-pointer" variant={'outline'} onClick={handleDeleteField}>
                        <ImCross className="text-red-500" />
                    </Button>
                </div>
            )}
            {localFields.map(({ id, content, position }) =>  (
                <div key={id} className="absolute top-0 left-0 z-30">
                    <div 
                        onClick={() => {
                            // handleSelectedId(id)
                        }} 
                    >
                        <EditorProvider
                            extensions={extensions} 
                            editable={role !== 'viewer'}  
                            content={content} 
                            onUpdate={({ editor }) => {
                                debouncedUpdateField(id, { ...localFields.find(f => f.id === id)!, content: editor.getHTML() });
                            }}
                            parseOptions={{
                                preserveWhitespace: 'full'
                            }}
                            customOptions={{
                                handleDrag,
                                bounds,
                                id: id || 0, 
                                position,
                                selectedId: selectedId || 0,
                                handleSelectedId,
                                role
                            }}
                        />
                    </div>
                </div>
            ))
            }
            <img 
                src={src} 
                alt={alt} 
                className="relative z-20 object-cover h-[100%] w-[100%] " 
                onClick={() => {
                    handleSelectedId('')
                }}
            />

        </div>
    )
}