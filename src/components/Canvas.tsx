import { CanvasProps } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { EditorContent, useEditor } from "@tiptap/react";

import {
    useWindowSize,
} from '@react-hook/window-size'

import MenuBar from "./MenuBar";
import { extensions } from "@/constants";

const content = `
<span>
  Hello World
</span>
`

export default function Canvas({ src, alt } : CanvasProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    const [isActive, setIsActive] = useState(false)

    const [width, height] = useWindowSize()

    const draggableRef = useRef<HTMLDivElement>(null)
    const slideRef=useRef<HTMLDivElement>(null)

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    const editor = useEditor({
        extensions,
        content,
        editable: !isActive,
    })

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
        bottom: slideSize.height - 35
    }

    return (
        <div ref={slideRef} className="relative min-w-[1024px] w-full h-full  border-2">
            <div className="absolute top-0 left-0 z-30">
                <Draggable
                    nodeRef={draggableRef as React.RefObject<HTMLElement>}
                    axis="both"
                    handle=".handle"
                    position={position}
                    grid={[25, 25]}
                    scale={1}
                    onStart={() => console.log('Drag started')}
                    onDrag={handleDrag}
                    onStop={handleDrag}
                    disabled={isActive}
                    bounds={bounds}
                >
                    <div 
                        ref={draggableRef} 
                        className={`handle tiptap min-w-[100px] max-w-[1024px]`}
                    >
                        {isActive && <MenuBar editor={editor} />}
                        <EditorContent 
                            className="inline-block w-auto max-w-full  "
                            editor={editor} 
                            onClick={() => {
                                if (!isActive) {
                                    setIsActive(true)
                                }
                            }} 
                        />
                    </div>
                </Draggable>
            </div>
            <img 
                src={src} 
                alt={alt} 
                className="relative z-20 object-cover h-[100%] w-[100%] cursor-pointer" 
                onClick={() => {
                    setIsActive(false)
                }}
            />

        </div>
    )
}