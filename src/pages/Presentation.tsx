import SlidesList from "@/components/SlidesList";
import ToolPanel from "@/components/ToolPanel";
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
        <main className="h-screen flex flex-col overflow-x-auto">
            <ToolPanel />
            <section className="flex h-[93%]">
                <SlidesList 
                    currentSlideId={currentSlideId}
                    handleSlideSelection={handleSlideSelection}
                />
                <div className="w-[75%] h-[100%] min-w-[1024px] ">
                    <img src={currentSlide!.src} alt="slide" className="object-cover h-[100%] w-[100%]" />
                </div>
                <UsersList />
            </section>
        </main>
    )

}