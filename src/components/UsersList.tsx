import UserItem from "./UserItem";

export default function UsersList() {
    return (
        <div className="relative z-40 mt-[40px] bg-white h-[100%] w-[250px] overflow-auto p-2 flex flex-col shrink-0 gap-4">
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