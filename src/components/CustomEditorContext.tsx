import { Editor } from '@tiptap/core'
import { EditorContent, useEditor, UseEditorOptions } from '@tiptap/react';
import {
    createContext, HTMLAttributes, ReactNode, RefObject, useContext,
    useRef,
} from 'react'
import Draggable from 'react-draggable';
import MenuBar from './MenuBar';


export type EditorContextValue = {
    editor: Editor | null;
}

export const EditorContext = createContext<EditorContextValue>({
    editor: null,
})

export const EditorConsumer = EditorContext.Consumer

/**
 * A hook to get the current editor instance.
 */
export const useCurrentEditor = () => useContext(EditorContext)

export type EditorProviderProps = {
    children?: ReactNode;
    slotBefore?: ReactNode;
    slotAfter?: ReactNode;
    customOptions?: any; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    editorContainerProps?: HTMLAttributes<HTMLDivElement>;
} & UseEditorOptions

/**
 * This is the provider component for the editor.
 * It allows the editor to be accessible across the entire component tree
 * with `useCurrentEditor`.
 */
export function EditorProvider({
    children, slotAfter, slotBefore,customOptions,editorContainerProps = {}, ...editorOptions
} : EditorProviderProps) {
    const { 
        // draggableRef, 
        position, 
        handleDrag, 
        bounds, 
        id,
        selectedId,
        handleSelectedId 
    } = {...customOptions}
    const draggableRef = useRef<HTMLDivElement>(null)

    // console.log(editorOptions)

    const editor = useEditor(editorOptions)

    // if (selectedId == id) {
    //     editor?.chain().focus().run()
    // }

    if (!editor) {
        return null
    }

    return (
        <EditorContext.Provider value={{ editor }}>
            {slotBefore}
            <MenuBar 
                editor={editor} 
                selectedId={selectedId} 
                currentId={id} 
            />
            <Draggable
                nodeRef={draggableRef as RefObject<HTMLElement>}
                axis="both"
                handle=".handle"
                position={position}
                grid={[25, 25]}
                scale={1}
                onDrag={(e, data) => handleDrag(id, e, data)}
                onStop={(e, data) => handleDrag(id, e, data)}
                disabled={selectedId !== 0}
                bounds={bounds}
            >
                <div
                    ref={draggableRef}
                    onClick={() => {
                        handleSelectedId(id)
                    }}
                    className={`handle tiptap min-w-[100px] max-w-[1024px]`}
                >
                    <EditorConsumer>
                        {({ editor: currentEditor }) => (
                        <EditorContent editor={currentEditor} {...editorContainerProps} />
                        )}
                    </EditorConsumer>
                    {children}
                </div>
            </Draggable>
            {slotAfter}
        </EditorContext.Provider>
    )
}
