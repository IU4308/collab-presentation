import { Button } from "../ui/button";
import { getEditorMethod } from "@/lib/utils";
import { useCurrentEditor } from "@tiptap/react";
import { ReactNode } from "react";

export default function MenuButton ({ 
    type, 
    icon, 
} : {
    type: string;
    icon: ReactNode;
}) {
    const { editor } = useCurrentEditor()
    return (
        <Button
            onClick={() => {
                getEditorMethod(editor!, type)()
            }}
            disabled={
                false
                // !getEditorMethod(editor, type, 'check')() 
                // || !editor.isEditable
            }
            className={`cursor-pointer rounded ${editor!.isActive(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
        >
            {icon}
        </Button>
    )
}