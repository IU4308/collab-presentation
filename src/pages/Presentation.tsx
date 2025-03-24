import Canvas from "@/components/Canvas";
import SlidesList from "@/components/SlidesList";
import UsersList from "@/components/UsersList";
import { slides } from "@/constants";
import { useState } from "react";

// import { useParams } from "react-router"

export default function Presentation() {
    // const params = useParams()
    const [currentSlideId, setCurrentSlideId] = useState(4)

    const handleSlideSelection = (id: number) => {
        setCurrentSlideId(id)
    }

    const currentSlide = slides.find(slide => slide.id === currentSlideId)

    return (
        <main className=" h-screen flex flex-col overflow-x-auto">
            <section className="flex h-[93%]">
                <SlidesList 
                    currentSlideId={currentSlideId}
                    handleSlideSelection={handleSlideSelection}
                />
                <Canvas {...currentSlide!} />
                <UsersList />
            </section>
        </main>
    )

}