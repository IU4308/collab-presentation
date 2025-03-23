import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { FaBold } from "react-icons/fa";

export default function BoldButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
        >
            <FaBold />
        </Button>
    )
}