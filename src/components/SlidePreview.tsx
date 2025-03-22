import { SlidePreviewProps } from "@/definitions";

export default function SlidePreview({ 
    id, 
    src, 
    alt, 
    currentSlideId,
    handleSlideSelection 
} : SlidePreviewProps) {
    return (
        <li>
            <img 
                src={src} 
                alt={alt}
                onClick={() => handleSlideSelection(id)}
                className={`object-cover rounded-xl aspect-video ${id === currentSlideId && 'border-2 border-orange-500'}`} 
            />
        </li>
    )
}