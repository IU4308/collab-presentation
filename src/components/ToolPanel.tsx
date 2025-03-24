import { CiHome } from "react-icons/ci";
import { Link } from "react-router";

export default function ToolPanel() {
    return (
        <header className="h-[7%] flex py-4 px-8 items-center">
            <div className="flex gap-2">
                <div className=" flex items-center">
                    <Link to={"/"}>
                        <CiHome className="text-xl"/>
                    </Link>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold">Title</span>
                    <span className="text-gray-500 text-xs">Author</span>
                </div>
            </div>
        </header>
    )
}