import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { FaCode } from "react-icons/fa";

export default function CodeButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleCode()
                .run()
            }
            className={`px-2 py-1 rounded ${editor.isActive('code') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <FaCode />
        </Button>
    )
}