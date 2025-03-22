import { slides } from "@/constants";
import SlidePreview from "./SlidePreview";
import { SlidesListProps } from "@/definitions";
import { IoAddSharp } from "react-icons/io5";
import { Button } from "./ui/button";


export default function SlidesList({ 
    currentSlideId,
    handleSlideSelection 
} : SlidesListProps) {
    return (
        <div className="flex flex-col shrink-0 gap-6  h-[100%] w-[200px] overflow-auto scroll-tiny  px-4 py-2">
            <h1 className="font-bold">Slides</h1>
            <Button variant={'outline'} className="cursor-pointer"><IoAddSharp /></Button >
            <ul className="flex flex-col gap-4">
                {slides.map(slide => (
                    <SlidePreview 
                        {...slide} 
                        currentSlideId={currentSlideId}
                        handleSlideSelection={handleSlideSelection}
                    />
                ))}
            </ul>
        </div>
    )
}