import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { GoItalic } from "react-icons/go";

export default function ItalicButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <GoItalic />
        </Button>
    )
}
