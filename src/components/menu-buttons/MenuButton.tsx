import { Button } from "../ui/button";
import { MenuButtonProps } from "@/definitions";
import { getEditorMethod } from "@/lib/utils";

export default function MenuButton ({ editor, type, icon, isEditing } : MenuButtonProps) {
    return (
        <Button
            onClick={() => {
                getEditorMethod(editor, type)()
            }}
            disabled={!getEditorMethod(editor, type, 'check')() || !isEditing}
            className={`cursor-pointer rounded ${editor.isActive(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
        >
            {icon}
        </Button>
    )
}