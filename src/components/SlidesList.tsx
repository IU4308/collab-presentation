// import { slides } from "@/constants";
import SlidePreview from "./SlidePreview";
import { SlidesListProps } from "@/definitions";
import { IoAddSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Link, useParams } from "react-router";
import { CiHome } from "react-icons/ci";
import { io } from "socket.io-client";
import axios from "axios";
import { ImCross } from "react-icons/im";
import ChooseTemplate from "./ChooseTemplate";

const apiUrl = import.meta.env.VITE_API_URL 
const socket = io(apiUrl);

export default function SlidesList({ 
    slides,
    currentSlideId,
    handleSlideSelection,
    role,
    title,
    author,
    isPresentMode
} : SlidesListProps) {
    const presentationId = useParams().presentationId

    const handleDisconnect = () => {
        socket.emit('disconnect')
    }

    const handleAddSlide = async () => {
        try {
            await axios.post(`${apiUrl}/presentations/${presentationId}/slides`);
        } catch (error) {
            console.error("Error adding new slide:", error);
        }
    };
    const handleDeleteSlide = async () => {
        try {
            await axios.delete(`${apiUrl}/presentations/${presentationId}/slides/${currentSlideId}`);
        } catch (error) {
            console.error("Error adding new slide:", error);
        }
    };

    // const  

    return (
        <div className={`${isPresentMode && 'hidden'} relative z-20 bg-white flex flex-col shrink-0 gap-2 h-[100%] w-[250px] py-2`}>
            <div className="flex gap-4 px-4">
                <div className=" flex items-center">
                    <Link to={"/"} onClick={handleDisconnect}>
                        <CiHome className="text-xl"/>
                    </Link>
                </div>
                <div className="flex flex-col ">
                    <span className="font-bold">{title}</span>
                    <span className="text-gray-500 text-xs">{author}</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 overflow-auto scroll-tiny w-full px-4">
                <h1 className="font-bold">Slides</h1>
                {role === 'creator' && (
                    <div className="grid grid-cols-2 gap-2">
                        <Button 
                            variant={'outline'} 
                            className="cursor-pointer"
                            onClick={handleAddSlide}
                        >
                            <IoAddSharp />
                        </Button >
                        <Button
                            variant={'outline'} 
                            onClick={handleDeleteSlide}
                            className="cursor-pointer"
                        >
                            <ImCross 
                                className="text-xs z-40 cursor-pointer hover:text-red-300 text-red-500" 
                            />
                        </Button>
                        {/* <Button
                            variant={'outline'}
                            className="col-span-2"
                        >
                            <CiImageOn />
                        </Button> */}
                        <ChooseTemplate slideId={currentSlideId}/>
                    </div>
                )}
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