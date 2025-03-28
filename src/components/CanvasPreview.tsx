import { extensions } from "@/constants";
import { Field } from "@/definitions";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { EditorProvider } from "./CustomEditorContext";

const apiUrl = import.meta.env.VITE_API_URL 

const socket = io(apiUrl);
export default function CanvasPreview({ src, alt, slideId } : { src: string; alt: string; slideId: string }) {
    const [fields, setFields] = useState<Field[] >([]);

    useEffect(() => {
            socket.on('fieldUpdated', ({ slideId: updatedSlideId, fieldId, updatedField }) => {
                if (slideId === updatedSlideId ) {
                    setFields((prevFields) => {
                        if (updatedField === null) {
                            return prevFields.filter((field) => field.id !== fieldId);
                        } else {
                            const existingField = prevFields.find((field) => field.id === fieldId);
                            if (existingField) {
                                return prevFields.map((field) =>
                                    field.id === fieldId ? { ...field, ...updatedField } : field
                                );
                            } else {
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

    return (
        <div>
            {fields.map(({ id, content, position }) =>  (
                <div key={id} className="absolute top-0 left-0 z-50">
                    <EditorProvider
                        extensions={extensions} 
                        editable={false}  
                        content={content} 
                        parseOptions={{
                            preserveWhitespace: 'full'
                        }}
                        customOptions={{
                            position: {
                                x: position.x / 5,
                                y: position.y / 5
                            }
                        }}
                    />
                </div>
            ))}
            <img 
                src={src} 
                alt={alt} 
                className="relative z-20 object-cover h-[100%] w-[100%] " 
            />
        </div>
    )
}