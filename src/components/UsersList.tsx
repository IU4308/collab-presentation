import UserItem from "./UserItem";

export default function UsersList() {
    return (
        <div className=" h-[100%] w-[200px] overflow-auto p-2 flex flex-col shrink-0 gap-4">
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