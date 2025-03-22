import UserItem from "./UserItem";

export default function UsersList() {
    return (
        <div className="w-[15%] p-2 flex flex-col gap-4">
            <h1 className="font-bold">Users</h1>
            <ul className="flex flex-col ">
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
                <UserItem />
            </ul>
        </div>
    )
}