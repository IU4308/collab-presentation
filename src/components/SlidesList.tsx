// import { slides } from "@/constants";
import SlidePreview from "./SlidePreview";
import { SlidesListProps } from "@/definitions";
import { IoAddSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { CiHome } from "react-icons/ci";
import { io } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function SlidesList({ 
    slides,
    currentSlideId,
    handleSlideSelection 
} : SlidesListProps) {
    const handleDisconnect = () => {
        socket.emit('disconnect')
    }
    return (
        <div className="relative z-20 bg-white flex flex-col shrink-0 gap-2  h-[100%] w-[250px] py-2">
            <div className="flex gap-2 px-4">
                <div className=" flex items-center">
                    <Link to={"/"} onClick={handleDisconnect}>
                        <CiHome className="text-xl"/>
                    </Link>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold">Title</span>
                    <span className="text-gray-500 text-xs">Author</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 overflow-auto scroll-tiny w-full px-4">
                <h1 className="font-bold">Slides</h1>
                <Button variant={'outline'} className="cursor-pointer"><IoAddSharp /></Button >
                <ul className="flex flex-col gap-2">
                    {slides?.map(slide => (
                        <SlidePreview 
                            key={slide.slideId}
                            {...slide} 
                            currentSlideId={currentSlideId}
                            handleSlideSelection={handleSlideSelection}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}