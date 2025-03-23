import { Editor } from "@tiptap/core";
import { Button } from "../ui/button";
import { GrBlockQuote } from "react-icons/gr";

export default function QuoteButton ({ editor } : { editor: Editor }) {
    return (
        <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`px-2 py-1 rounded ${editor.isActive('blockquote') ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
            >
            <GrBlockQuote />
        </Button>
    )
}