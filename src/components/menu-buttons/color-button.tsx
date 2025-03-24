import { Editor } from "@tiptap/core"
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
import { getActiveColor } from "@/lib/utils";
import { ColorButtonProps } from "@/definitions";

const Item = ({ editor, color, label }: ColorButtonProps) => {
    return (
        <DropdownMenuRadioItem 
            value={color}
            onClick={() => {
                editor.chain().focus().setColor(color).run();
                setTimeout(() => {
                    editor.chain().focus().run();
                }, 300);
            }}
            className="cursor-pointer flex items-center gap-2" 
        >
            <div style={{ backgroundColor: color }} className="h-[10px] w-[10px]"></div>
            <span>{label}</span>
        </DropdownMenuRadioItem>
    )
}

export default function ColorButton ({ editor, isEditing } : { editor: Editor, isEditing: boolean}) {
    const activeColor = getActiveColor(editor);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button
                    className="bg-gray-200 text-black hover:bg-blue-600 hover:text-white"
                    disabled={!editor.can().chain().focus().setColor('#958DF1').run() || !isEditing}
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
                            key={color.id} 
                            editor={editor} 
                            color={color.color} 
                            label={color.label} 
                        />
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}