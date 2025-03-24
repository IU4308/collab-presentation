import { CanvasProps } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Content, EditorProvider } from "@tiptap/react";

import {
    useWindowSize,
} from '@react-hook/window-size'

import MenuBar from "./MenuBar";
import { extensions } from "@/constants";
import { Button } from "./ui/button";

export default function Canvas({ src, alt } : CanvasProps) {
    const [fields, setFields] = useState<{ id: number, content: Content, position: { x: number, y: number } }[]>([]);
    const [selectedId, setSelectedId] = useState(0);
    const [isActive, setIsActive] = useState(false)
    
    const handleSelectedId = (id: number) => {
        setSelectedId(id)
    }

    const addEditor = () => {
        const newId = fields.length + 1
        setFields([...fields, { id: fields.length + 1, content: '<p>Add Text</p>', position: { x: 50, y: 100 } }]);
        handleSelectedId(newId);
    }

    ////////////////////
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    
    const [width, height] = useWindowSize()

    const draggableRef = useRef<HTMLDivElement>(null)
    const slideRef=useRef<HTMLDivElement>(null)

    const handleDrag = (id: number,_: DraggableEvent, data: DraggableData) => {
        setFields(fields.map(
            editor => editor.id === id 
                ? {...editor, position: { x: data.x, y: data.y}} 
                : editor
        ))
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

    return (
        <div ref={slideRef} className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip ">
            <Button className="relative z-50 cursor-pointer" onClick={() => {
                addEditor()
            }}>Add Text</Button>
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
                                setSelectedId(id)
                            }}
                            className={`handle tiptap min-w-[100px] max-w-[1024px]`}
                        >
                            <EditorProvider 
                                slotBefore={<MenuBar selectedId={selectedId} currentId={id} />} 
                                extensions={extensions} 
                                // editable={isActive}
                                content={content} 
                                onUpdate={({ editor }) => {
                                    setIsActive(true);
                                    setFields(fields.map(
                                        field => field.id === selectedId
                                            ? {...field, content: editor.getHTML()} 
                                            : field
                                    ))
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
                    setSelectedId(0)
                }}
            />

        </div>
    )
}