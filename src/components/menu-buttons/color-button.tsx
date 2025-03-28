import { Button } from "../ui/button"
import { MdFormatColorText } from "react-icons/md";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { colors } from "@/constants";
import { Editor } from "@tiptap/react";
import { HeadingColorButtonsProps } from "@/definitions";
import { useEffect, useState } from "react";

const Item = ({ 
    editor,
    color, 
    label,
    handleSelectedId, 
    currentId 
}: {
    editor: Editor;
    color: string;
    label: string;
    handleSelectedId: (id: string) => void
    currentId: string
}) => {
    return (
        <DropdownMenuRadioItem 
            value={color}
            onClick={() => {
                setTimeout(() => {
                    handleSelectedId(currentId)
                    editor.chain().focus().setColor(color).run();
                }, 300);
            }}
            disabled={
                !editor.can().chain().focus().setColor(color).run()
            }
            className="cursor-pointer flex items-center gap-2" 
        >
            <div style={{ backgroundColor: color }} className="h-[10px] w-[10px]"></div>
            <span>{label}</span>
        </DropdownMenuRadioItem>
    )
}

export default function ColorButton ({ editor, currentId, selectedId, handleSelectedId }: HeadingColorButtonsProps) {
    const [activeColor, setActiveColor] = useState('#000')
    useEffect(() => {
        if (!editor) return;
    
        const updateActiveColor = () => {
            const color = editor.getAttributes('textStyle').color;
            setActiveColor(color);
        };
    
        editor.on('transaction', updateActiveColor);
        return () => {
            editor.off('transaction', updateActiveColor);
        };
    }, [editor]);
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                    className="bg-gray-200 text-black hover:bg-blue-600 hover:text-white"
                    disabled={
                        !editor.can().chain().focus().setColor('#958DF1').run() 
                        || selectedId !== currentId
                        // || selectedId == ''
                        // || !editor!.isEditable
                    }
                >
                    <MdFormatColorText style={{ color: activeColor }}  />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Change color</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={activeColor}>
                    {colors.map(color => (
                        <Item 
                            editor={editor}
                            key={color.id} 
                            color={color.color} 
                            label={color.label} 
                            handleSelectedId={handleSelectedId} 
                            currentId={currentId}
                        />
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}