import { CanvasProps } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Content, EditorProvider } from "@tiptap/react";
import { BiText } from "react-icons/bi";

import {
    useWindowSize,
} from '@react-hook/window-size'

import MenuBar from "./MenuBar";
import { extensions } from "@/constants";
import { Button } from "./ui/button";

import { io } from "socket.io-client";
import axios from "axios";

const socket = io('http://localhost:4000');

export default function Canvas({ src, alt } : CanvasProps) {
    const [fields, setFields] = useState<{ id: number, content: Content, position: { x: number, y: number } }[]>([]);
    const [selectedId, setSelectedId] = useState(0);
    const [isActive, setIsActive] = useState(false)
    
    const handleSelectedId = (id: number) => {
        setSelectedId(id)
    }

    const addEditor = () => {
        const newFields = [...fields, { id: fields.length + 1, content: '<p>Add Text</p>', position: { x: 50, y: 100 } }];
        setFields(newFields);
        updateFieldsOnServer(newFields);
    }

    const updateFieldsOnServer = async (updatedFields: any) => {
        try {
            await axios.post('http://localhost:4000/api/fields', updatedFields);
        } catch (error) {
            console.error('Error updating fields on server:', error);
        }
    }

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
            setFields(updatedFields);
        });

        return () => {
            socket.off('updateFields');
        };
    }, []);

    ////////////////////
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    const [shift, setShift] = useState(0)
    
    const [width, height] = useWindowSize()

    const draggableRef = useRef<HTMLDivElement>(null)
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

    useEffect(() => {
        const selectedField = fields.find(field => field.id === selectedId)
        if (selectedField !== undefined && slideSize.width - 732 - selectedField?.position.x < 0) {
            setShift(slideSize.width - 732 - selectedField!.position.x)
        }
    }, [fields, selectedId, slideSize.width])

    const bounds = {
        left: 0, 
        top: 0, 
        right: slideSize.width, 
        bottom: slideSize.height
    }
    //////////////////////

    // console.log(fields)

    return (
        <div ref={slideRef} className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip ">
            <div className="py-2 flex gap-2">
                <Button variant={'default'} className="relative z-50 cursor-pointer text-white" onClick={addEditor}>
                    <BiText />
                </Button>
            </div>
            {fields.map(({ id, content, position }) => (
                <div key={id} className="absolute top-0 left-0 z-30">
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLElement>}
                        axis="both"
                        handle=".handle"
                        position={position}
                        grid={[25, 25]}
                        scale={1}
                        onDrag={(e, data) => handleDrag(id, e, data)}
                        onStop={(e, data) => handleDrag(id, e, data)}
                        disabled={isActive}
                        bounds={bounds}
                    >
                        <div 
                            ref={draggableRef} 
                            onClick={() => {
                                handleSelectedId(id)
                            }}
                            className={`handle tiptap min-w-[100px] max-w-[1024px]`}
                        >
                            <EditorProvider 
                                slotBefore={<MenuBar selectedId={selectedId} currentId={id} shift={shift} />} 
                                extensions={extensions} 
                                // editable={isActive}
                                content={content} 
                                onUpdate={({ editor }) => {
                                    setIsActive(true);
                                    const newFields = fields.map(
                                        field => field.id === selectedId
                                            ? {...field, content: editor.getHTML()} 
                                            : field
                                    )
                                    setFields(newFields)
                                    updateFieldsOnServer(newFields)
                                }}
                            />
                        </div>
                    </Draggable>
                </div>
            ))}
            <img 
                src={src} 
                alt={alt} 
                className="relative z-20 object-cover h-[100%] w-[100%] cursor-pointer" 
                onClick={() => {
                    setIsActive(false)
                    handleSelectedId(0)
                }}
            />

        </div>
    )
}