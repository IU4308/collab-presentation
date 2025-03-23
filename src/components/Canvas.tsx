import { CanvasProps } from "@/definitions";
import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
// import Markdown from 'react-markdown'
// import remarkGfm from 'remark-gfm';
// import MDEditor from "@uiw/react-md-editor";
// import { Button } from "./ui/button";
// import {
//     Tooltip,
//     TooltipContent,
//     TooltipProvider,
//     TooltipTrigger,
//   } from "@/components/ui/tooltip"
import Editor from "@/pages/Editor";

export default function Canvas({ src, alt } : CanvasProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    // const [height, setHeight] = useState(300);

    // const [isEditing, setIsEditing] = useState(false);
    // const [content, setContent] = useState("# Hello World");

    const draggableRef = useRef<HTMLDivElement>(null)
    // const editorRef = useRef(null)

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    // const handleContent = (value: string) => {
    //     setContent(value)
    // }

    // const handleHeight = (value: number) => {
    //     setHeight(value)
    // }


    return (
        <div className="relative border-2 min-w-[1024px] w-[100%]">
            <div className="absolute top-0 left-0">
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
                >
                    <div 
                        ref={draggableRef} 
                        className={`handle tiptap`}
                    >
                        <Editor />
                    </div>
                </Draggable>
            </div>

            <div className="h-[100%]  ">
                <img src={src} alt={alt} className="object-cover h-[100%] w-[100%] border" />
            </div>
        </div>
    )
}