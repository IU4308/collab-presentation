import { MenuButtonProps } from "@/definitions";
import { Button } from "../ui/button";
import { getEditorMethod } from "@/lib/utils";

export default function MenuButton ({ 
    editor,
    selectedId,
    currentId,
    type, 
    icon, 
    handleSelectedId
} : MenuButtonProps) {
    
    return (
        <Button
        onClick={() => {
                getEditorMethod(editor!, type)()
                setTimeout(() => {
                    handleSelectedId(currentId)
                }, 300);
            }}
            disabled={
                !getEditorMethod(editor, type, 'check')() 
                || selectedId !== currentId
            }
            className={` rounded ${editor!.isActive(type) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
        >
            {icon}
        </Button>
    )
}