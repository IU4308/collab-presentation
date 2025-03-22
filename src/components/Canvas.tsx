import { CanvasProps } from "@/definitions";
import { useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import Markdown from 'react-markdown'
// import { MDXEditor } from '@mdxeditor/editor'
// import { headingsPlugin } from '@mdxeditor/editor'

// import '@mdxeditor/editor/style.css'

export default function Canvas({ src, alt } : CanvasProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isEditing, setIsEditing] = useState(false);
    // const [content, setContent] = useState("## Drag me! ✍️\n\nWrite in **Markdown** format.");
    const content = "## Drag me! ✍️\n\nWrite in **Markdown** format."

    const draggableRef = useRef<HTMLDivElement>(null)

    const handleDrag = (_: DraggableEvent, data: DraggableData) => {
        setPosition({ x: data.x, y: data.y });
    };

    // const handleContentChange = (value: string) => {
    //     setContent(value);
    // };


    return (
        <div className="relative border-2 min-w-[1024px] w-[100%]">
            <div className="absolute top-0 left-0 ">
                <Draggable
                    nodeRef={draggableRef as React.RefObject<HTMLElement>}
                    axis="both"
                    handle=".handle"
                    // defaultPosition={{x: 0, y: 0}}
                    position={position}
                    grid={[25, 25]}
                    scale={1}
                    onStart={() => console.log('Drag started')}
                    onDrag={handleDrag}
                    onStop={handleDrag}
                >
                    <div ref={draggableRef} className="cursor-pointer  border-2 border-red-500 p-10 bg-white">
                        {isEditing ? (
                            <div>
                                {/* <MDXEditor markdown="# Hello world" plugins={[headingsPlugin()]} /> */}
                            </div>

                        ) : (
                            <div onDoubleClick={() => setIsEditing(true)}>    
                                <Markdown>{content}</Markdown>
                            </div>
                        )}
                    </div>
                    {/* <Button onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? "Save" : "Edit"}
                    </Button> */}
                </Draggable>
            </div>

            <div className=" h-[100%]  ">
                <img src={src} alt={alt} className="object-cover h-[100%] w-[100%] border" />
            </div>
        </div>
    )
}