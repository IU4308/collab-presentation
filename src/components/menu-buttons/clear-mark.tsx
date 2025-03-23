import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { CiEraser } from "react-icons/ci";

export default function ClearMarksButton ({ editor } : { editor: Editor }) {
    return (
       <Button
            variant="default"
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className="px-2 py-1 rounded text-black bg-gray-200 hover:bg-red-600 hover:text-white"
            >
            <CiEraser />
        </Button>
    )
}