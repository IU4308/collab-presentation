import SlidesList from "@/components/SlidesList";
import UsersList from "@/components/UsersList";
import { slides } from "@/constants";
import { useState } from "react";
import { CiHome } from "react-icons/ci";



// import { useParams } from "react-router"

export default function Presentation() {
    // const params = useParams()
    const [currentSlideId, setCurrentSlideId] = useState(1)

    const handleSlideSelection = (id: number) => {
        setCurrentSlideId(id)
    }

    const currentSlide = slides.find(slide => slide.id === currentSlideId)
    
    return (
        <main className="h-screen flex flex-col">
            <header className="flex py-4 px-8 border items-center">
                <div className="flex gap-2">
                    <div className=" flex items-center"><CiHome className="text-xl"/></div>
                    <div className="flex flex-col ">
                        <span className="font-bold">Title</span>
                        <span className="text-gray-500 text-xs">Author</span>
                    </div>
                </div>
            </header>
            <section className="flex">
                <SlidesList 
                    currentSlideId={currentSlideId}
                    handleSlideSelection={handleSlideSelection}
                />
                <div className="border w-[75%] ">
                    <img src={currentSlide!.src} alt="slide" className="object-cover h-screen w-[100%]" />
                </div>
                <UsersList />
            </section>
        </main>
    )

}