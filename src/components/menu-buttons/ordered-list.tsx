import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { GoListOrdered } from "react-icons/go";

export default function OrderedListButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 rounded ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <GoListOrdered />
        </Button>
    )
}