import { EditorContent, useCurrentEditor } from "@tiptap/react"

export default function TextField () {
    const { editor } = useCurrentEditor()
    return (
        // <div className="border-4">
            <EditorContent 
                className="inline-block w-auto max-w-full  "
                editor={editor} 
            />
            
        // </div>
    )
}