
export interface SlidesListProps {
    currentSlideId: number;
    handleSlideSelection: (id: number) => void;
}

export interface SlidePreviewProps { 
    id: number;
    src: string; 
    alt: string;
    currentSlideId: number;
    handleSlideSelection: (id: number) => void;
}