import { FaEllipsisH } from "react-icons/fa";
import { DiMootoolsBadge } from "react-icons/di";


import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserItem () {
    const [role, setRole] = React.useState("viewer")
    const nickname = 'John Doe'

    return (
        <li className="border-y py-4 flex  justify-between items-center ">
            <div className="flex items-center ">
                <span className="whitespace-nowrap overflow-auto">{nickname.slice(0, 15)}</span>
                {nickname.length > 15 &&<span>...</span>}
                {role === 'editor' && <span><DiMootoolsBadge className="text-2xl" /></span>}
            </div>
            {/* <Button className="text-xs" type="submit">Assign editor</Button> */}
            <DropdownMenu >
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Button variant="secondary" >
                        <FaEllipsisH />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Assign Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={role} onValueChange={setRole} >
                        <DropdownMenuRadioItem className="cursor-pointer" value="viewer">Viewer</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="cursor-pointer" value="editor">Editor</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </li>
    )
}