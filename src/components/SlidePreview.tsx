import { SlidePreviewProps } from "@/definitions";

export default function SlidePreview({ 
    slideId, 
    src, 
    alt, 
    currentSlideId,
    handleSlideSelection,
} : SlidePreviewProps) {

    return (
        <li className="relative">
            <img 
                src={src} 
                alt={alt}
                onClick={() => handleSlideSelection(slideId)}
                className={`object-cover rounded-xl aspect-video cursor-pointer border-2 ${slideId === currentSlideId && 'border-4 border-orange-500'}`} 
            />
        </li>
    )
}