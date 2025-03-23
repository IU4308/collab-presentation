import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { HiOutlineStrikethrough } from "react-icons/hi2";

export default function StrikeButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
                !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={`px-2 py-1 rounded ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <HiOutlineStrikethrough />

        </Button>
    )
}