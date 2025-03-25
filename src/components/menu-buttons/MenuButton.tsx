import { MenuButtonProps } from "@/definitions";
import { Button } from "../ui/button";
import { getEditorMethod } from "@/lib/utils";

export default function MenuButton ({ 
    editor,
    selectedId,
    currentId,
    // isActive,
    type, 
    icon, 
} : MenuButtonProps) {
    return (
        <Button
            onClick={() => {
                getEditorMethod(editor!, type)()
            }}
            disabled={
                !getEditorMethod(editor, type, 'check')() 
                || selectedId !== currentId
                // || !editor.isEditable
            }
            className={`cursor-pointer rounded ${editor!.isActive(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
        >
            {icon}
        </Button>
    )
}