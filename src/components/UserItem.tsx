import { FaEllipsisH } from "react-icons/fa";
import { DiMootoolsBadge } from "react-icons/di";
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
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { UserType } from "@/definitions";

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function UserItem ({ 
    username, 
    currentUsername, 
    currentRole,
    userId 
} : { 
    username: string, 
    userId: string,
    currentUsername: string, 
    currentRole: string | undefined,
}) {
    const [role, setRole] = useState("viewer")

    const handleRole = (role: string) => {
        setRole(role)
        socket.emit('updateRole', { userId, role })
    }

    useEffect(() => {
        // Listen for userEvent to update the role
        socket.on("userEvent", (updatedUsers: UserType[]) => {
            const updatedUser = updatedUsers.find((user) => user.socketId === userId);
            if (updatedUser) {
                setRole(updatedUser.role);
            }
        });

        return () => {
            socket.off("userEvent");
        };
    }, [userId]);

    return (
        <li className="border-y py-4 flex  justify-between items-center ">
            <div className="flex items-center ">
                <span className="whitespace-nowrap overflow-auto">{username.slice(0, 15)}</span>
                {username.length > 15 &&<span>...</span>}
                {username === currentUsername && <span>&nbsp;(You)</span>}
                {role === 'editor' && <span><DiMootoolsBadge className="text-2xl" /></span>}
            </div>
            {currentRole === 'creator' && username !== currentUsername && <DropdownMenu >
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Button variant="secondary" >
                        <FaEllipsisH />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Assign Role</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={role} onValueChange={(value) => handleRole(value)} >
                        <DropdownMenuRadioItem className="cursor-pointer" value="viewer">Viewer</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem className="cursor-pointer" value="editor">Editor</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>}
        </li>
    )
}