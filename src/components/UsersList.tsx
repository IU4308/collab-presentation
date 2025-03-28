import { useEffect, useState } from "react";
import UserItem from "./UserItem";
import { io } from "socket.io-client";
import { useParams } from "react-router";
import { UserType } from "@/definitions";

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);
export default function UsersList({ username, role, isPresentMode } : { username: string, role: string | undefined, isPresentMode: boolean }) {
    const presentationId = useParams().presentationId
    const [users, setUsers] = useState<UserType[]>([]);
    useEffect(() => {
        socket.on('userEvent', (users: UserType[]) => {
            setUsers(users.filter(user => user.presentationId === presentationId))
        })

        return () => {
            socket.off("userEvent");
        };
    }, [presentationId])

    return (
        <div className={`${isPresentMode && 'hidden'} relative z-40 mt-[40px] bg-white h-[100%] w-[250px] overflow-auto p-2 flex flex-col shrink-0 gap-4`}>
            <h1 className="font-bold">Users</h1>
            <ul className="flex flex-col ">
                {users.map(user => (
                    <UserItem key={user.socketId} username={user.username} userId={user.socketId} currentUsername={username} currentRole={role}/>
                ))}
            </ul>
        </div>
    )
}