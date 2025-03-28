import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./menu-buttons/MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";
import { Editor } from "@tiptap/react";

export default function MenuBar ({ 
    editor,
    selectedId,
    currentId
} : { 
    editor: Editor | null;
    selectedId: string; 
    currentId: string;
}) {
    if (!editor) {
        return null
    }
    return (
        <>
            {(currentId === selectedId || selectedId == '') && (
                <div className="fixed z-50 top-0 left-[350px] border-b-2 max-xl:border-0 control-group w-[732px] p-2 bg-white max-xl:w-[200px] max-xl:left-[350px]">
                    <div className="button-group flex w-full gap-2 max-xl:grid max-xl:grid-cols-5">
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
                </div>
            )}
        </>
    )
}