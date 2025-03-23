import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { GoListUnordered } from "react-icons/go";

export default function UnorderedListButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 rounded ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <GoListUnordered />
        </Button>
    )
}