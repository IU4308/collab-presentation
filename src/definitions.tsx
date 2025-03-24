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

export interface PreviewProps {
    id: number;
    src: string;
    alt: string;
}

export interface CanvasProps {
    id: number;
    src: string;
    alt: string;
}

export interface EditorData { 
    id: number; 
    content: string; 
    position: { x: number; y: number }; 
}