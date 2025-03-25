import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./menu-buttons/MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";
import { Editor } from "@tiptap/react";

export default function MenuBar ({ 
    editor,
    // isActive,
    selectedId,
    currentId
} : { 
    editor: Editor | null;
    selectedId: number; 
    currentId: number;
}) {
    if (!editor) {
        return null
    }

    return (
        <>
            {currentId === selectedId &&(<div className="absolute z-50 top-0 left-[150px] control-group w-[732px] p-2 rounded-xl bg-white border-gray-300 ">
                <div className="button-group flex w-[732px] gap-2">
                    <HeadingButton editor={editor} selectedId={selectedId} currentId={currentId}   />
                    <ColorButton editor={editor} selectedId={selectedId} currentId={currentId} />
                    {buttons.map(button => (
                        <MenuButton 
                            key={button.id}
                            editor={editor}
                            selectedId={selectedId} 
                            currentId={currentId}
                            type={button.type}
                            icon={button.icon}
                        />
                    ))}
                </div>
            </div>)}
        </>
    )
}