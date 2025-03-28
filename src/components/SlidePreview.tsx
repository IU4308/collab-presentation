import { SlidePreviewProps } from "@/definitions";
import axios from "axios";
import { ImCross } from "react-icons/im";
import { useParams } from "react-router";

const apiUrl = import.meta.env.VITE_API_URL 

export default function SlidePreview({ 
    slideId, 
    src, 
    alt, 
    currentSlideId,
    handleSlideSelection,
    role 
} : SlidePreviewProps) {
    const presentationId = useParams().presentationId

    const handleAddSlide = async () => {
        try {
            await axios.delete(`${apiUrl}/presentations/${presentationId}/slides/${slideId}`);
        } catch (error) {
            console.error("Error adding new slide:", error);
        }
    };
    return (
        <li className="relative">
            {role === 'creator' && (
                <ImCross 
                    onClick={handleAddSlide}
                    className="absolute top-[10px] right-[10px] text-xs z-40 cursor-pointer hover:text-red-300 text-red-500" 
                />
            )}
            <img 
                src={src} 
                alt={alt}
                onClick={() => handleSlideSelection(slideId)}
                className={`object-cover rounded-xl aspect-video cursor-pointer border-2 ${slideId === currentSlideId && 'border-4 border-orange-500'}`} 
            />
        </li>
    )
}