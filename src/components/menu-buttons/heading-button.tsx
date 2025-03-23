import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getActiveHeading } from "@/lib/utils";
import { Editor } from "@tiptap/core";
import { BiFontSize } from "react-icons/bi";

const Item = ({ editor, level }: { editor: Editor, level: 1 | 2 | 3 | 4 | 5 | 6 }) => {
    return (
        <DropdownMenuRadioItem 
            value={`h${level}`}
            onClick={() => editor.chain().focus().toggleHeading({ level: level }).run()}
            className="cursor-pointer" 
        >
            {`H${level}`}
        </DropdownMenuRadioItem>
    )
}

export default function HeadingButton ({ editor } : { editor: Editor }) {
    const items = Array.from({ length: 6 }, (_, i) => i + 1)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Button 
                    disabled={
                        !editor.can()
                        .chain()
                        .focus()
                        .toggleHeading({ level: 1 })
                        .run()
                    } 
                    variant="outline" 
                >
                    <BiFontSize />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Change heading</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={getActiveHeading(editor)}  >
                    {/* <Item editor={editor} value="h1" /> */}
                    {items.map(item => (
                        <Item key={item} editor={editor} level={item as 1 | 2 | 3 | 4 | 5 | 6} />
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}