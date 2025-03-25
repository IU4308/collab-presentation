import { CanvasProps, Field } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import { DraggableData, DraggableEvent } from 'react-draggable';
import { BiText } from "react-icons/bi";
import { ImCross } from "react-icons/im";

import {
    useWindowSize,
} from '@react-hook/window-size'

import { extensions } from "@/constants";
import { Button } from "./ui/button";

import { io } from "socket.io-client";
import axios from "axios";
import { EditorProvider } from "./CustomEditorContext";

const socket = io('http://localhost:4000');

export default function Canvas({ src, alt } : CanvasProps) {
    const [fields, setFields] = useState<Field[]>([]);
    const [selectedId, setSelectedId] = useState(0);
    // const [isActive, setIsActive] = useState(false)

    // const selectedField = fields.find(field => field.id === selectedId)

    // console.log(selectedField)
    // console.log(fields)
    
    const handleSelectedId = (id: number) => {
        setSelectedId(id)
    }

    const handleAddField = () => {
        const newFields = [...fields, { id: Date.now(), content: '<p>Add Text</p>', position: { x: 50, y: 100 } }];
        setFields(newFields);
        updateFieldsOnServer(newFields);
    }

    const handleDeleteField = () => {
        const newFields = fields.filter(field => field.id !== selectedId)
        setFields(newFields)
        updateFieldsOnServer(newFields);
        setSelectedId(0);
    }

    const updateFieldsOnServer = async (updatedFields: Field[]) => {
        // console.log(updatedFields)
        try {
            await axios.post('http://localhost:4000/api/fields', updatedFields);
        } catch (error) {
            console.error('Error updating fields on server:', error);
        }
    }

    // const debouncedUpdateFieldsOnServer = debounce((updatedFields: any) => {
    //     updateFieldsOnServer(updatedFields);
    // }, 300);

    useEffect(() => {
        const fetchFields = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/fields');
                setFields(response.data);
            } catch (error) {
                console.error('Error fetching fields:', error);
            }
        };

        fetchFields();

        socket.on('updateFields', (updatedFields) => {
            // if (JSON.stringify(fields) !== JSON.stringify(updatedFields)) {
                // console.log('Updating fields state with real-time data:', updatedFields);
                setFields(() => [...updatedFields]); // Create a new array reference
            // }
        });

        return () => {
            socket.off('updateFields');
        };
    }, []);

    // const [clientId, setClientId] = useState<string | null>(null)
    // const [editingStatus, setEditingStatus] = useState<{ [fieldId: number]: string }>({});


    // useEffect(() => {
    //     // Listen for the connection event to get the socket ID
    //     socket.on('connect', () => {
    //         console.log('Connected with socket ID:', socket.id);
    //         setClientId(socket.id ?? null); // Store the unique client ID or null if undefined
    //     });
    
    //     return () => {
    //         socket.off('connect'); // Clean up the listener on unmount
    //     };
    // }, []);


    // useEffect(() => {
    //     console.log('test')
    //     socket.on('editingStatus', (status) => {
    //         console.log('Editing status updated:', status);
    //         setEditingStatus(status); // Update the editing status
    //     });
    
    //     return () => {
    //         socket.off('editingStatus'); // Clean up the listener on unmount
    //     };
    // })

    ////////////////////
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    const [width, height] = useWindowSize()
    const slideRef=useRef<HTMLDivElement>(null)

    const handleDrag = (id: number,_: DraggableEvent, data: DraggableData) => {
        const updatedFields = fields.map(
            editor => editor.id === id 
                ? {...editor, position: { x: data.x, y: data.y}} 
                : editor
        );
        setFields(updatedFields);

        updateFieldsOnServer(updatedFields);
    };

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

    // const customOptions = {
    //     handleDrag, 
    //     bounds, 
    //     selectedId,
    //     handleSelectedId 
    // }

    return (
        <div ref={slideRef} className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip ">
            <div className="relative top-0 py-2 flex gap-2 z-40 w-[100px]">
                <Button variant={'outline'} className=" z-50 cursor-pointer text-white" onClick={handleAddField}>
                    <BiText className="text-black" />
                </Button>
                <Button className="cursor-pointer" variant={'outline'} onClick={handleDeleteField}>
                    <ImCross className="text-red-500" />
                </Button>
            </div>
            {fields.map(({ id, content, position }) => {
                // console.log(id, content, position)
                return (<div key={id} className="absolute top-0 left-0 z-30">
                    <div 
                        onClick={() => {
                            handleSelectedId(id)
                            // socket.emit('startEditing', id);
                        }} 
                        // className={`${editingStatus[id] && editingStatus[id] !== clientId && "border border-red-500"}`}
                    >
                        <EditorProvider
                            // key={clientId === editingStatus[id] ? id : `${id}-${content}`}
                            extensions={extensions} 
                            // editable={isActive}  
                            content={content} 
                            onUpdate={({ editor }) => {
                                // setIsActive(true);
                                const newFields = fields.map(
                                    field => field.id === id
                                        ? {...field, content: editor.getHTML()} 
                                        : field
                                )
                                setFields(newFields)
                                updateFieldsOnServer(newFields)
                                editor.chain().focus().run()
                            }}
                            customOptions={{
                                handleDrag,
                                bounds,
                                id: id || 0, // Provide a fallback value for `id`
                                position,
                                selectedId: selectedId || 0, // Provide a fallback value for `selectedId`
                                handleSelectedId,
                            }}
                            
                        />
                        {/* {editingStatus[id] && editingStatus[id] !== clientId && (
                            <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded">
                                Being edited by another user
                            </div>
                        )} */}
                    </div>
                </div>
            )})
            }
            <img 
                src={src} 
                alt={alt} 
                className="relative z-20 object-cover h-[100%] w-[100%] cursor-pointer" 
                onClick={() => {
                    // setIsActive(false)
                    handleSelectedId(0)
                    // socket.emit('stopEditing', selectedId);
                }}
            />

        </div>
    )
}