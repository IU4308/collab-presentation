import { CanvasProps } from "@/definitions";
import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Editor, EditorContent } from "@tiptap/react";

import {
    useWindowSize,
} from '@react-hook/window-size'

import MenuBar from "./MenuBar";
import { extensions } from "@/constants";
import { Button } from "./ui/button";

const content = `
<p>
  Add text
</p>
`

const initialEditor = new Editor({
    extensions,
    editable: false
    // content,
})

export default function Canvas({ src, alt } : CanvasProps) {
    const [editors, setEditors] = useState<{ id: number, editor: Editor, position: { x: number, y: number } }[]>([]);
    const [selectedId, setSelectedId] = useState(0);
    // const [test, setTest] = useState({})
    const [forceRender, setForceRender] = useState(false);

    const handleRender = () => setForceRender(!forceRender)

    const selectedEditor = editors.find(editor => editor.id === selectedId)

    const [slideSize, setSlideSize] = useState({
        width: 0,
        height: 0,
    })
    const [isActive, setIsActive] = useState(false)
    // const isActive = true

    const [width, height] = useWindowSize()

    const draggableRef = useRef<HTMLDivElement>(null)
    const slideRef=useRef<HTMLDivElement>(null)

    const handleDrag = (id: number,_: DraggableEvent, data: DraggableData) => {
        setEditors(editors.map(
            editor => editor.id === id 
                ? {...editor, position: { x: data.x, y: data.y}} 
                : editor
        ))
        // console.log('dragging')
    };

    const handleSelectedId = (id: number) => {
        setSelectedId(id)
    }
    
    const addEditor = () => {
        const editor = new Editor({
            extensions,
            content,
            editable: true,
            // onUpdate: ({ editor }) => {
            //     // console.log('Editor content changed:', editor.getHTML())
            //     setTest(editor)
            // }
        })

        

        setEditors([...editors, { id: editors.length + 1, editor, position: { x: 50, y: 100 } }]);
    }

    useEffect(() => {
        // console.log(editors)
        console.log(selectedId)
    }, [editors.length, selectedId])

    // console.log(selectedId)

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

    return (
        <div ref={slideRef} className="relative z-40 min-w-[1024px] w-full h-[calc(100%+45px)] overflow-clip ">
            <div className="px-2 flex gap-2 items-center">
                <Button onClick={addEditor}>Add Text</Button>
                <MenuBar 
                    editor={selectedEditor !== undefined ? selectedEditor.editor : initialEditor} 
                    handleRender={handleRender}   
                />
            </div>
            {editors.map(({ id, editor, position }) => (
                <div key={id} className="absolute top-0 left-0 z-30">
                    <Draggable
                        nodeRef={draggableRef as React.RefObject<HTMLElement>}
                        axis="both"
                        handle=".handle"
                        position={position}
                        grid={[25, 25]}
                        scale={1}
                        // onStart={() => console.log('Drag started')}
                        onDrag={(e, data) => handleDrag(id, e, data)}
                        onStop={(e, data) => handleDrag(id, e, data)}
                        disabled={isActive}
                        bounds={bounds}
                    >
                        <div 
                            ref={draggableRef} 
                            className={`handle tiptap min-w-[100px] max-w-[1024px]`}
                        >
                            <EditorContent 
                                className="inline-block w-auto max-w-full  "
                                editor={editor} 
                                onClick={() => {
                                    handleSelectedId(id)
                                    handleRender()
                                    if (!isActive) {
                                        // editor.chain().focus()
                                        setIsActive(true)
                                    }
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