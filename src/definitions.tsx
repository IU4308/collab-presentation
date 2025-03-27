import { Content, Editor } from "@tiptap/core";
import { ReactNode } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";

export interface SlidesListProps {
    slides: Slide[] | undefined;
    currentSlideId: string;
    handleSlideSelection: (id: string) => void;
}

export interface SlidePreviewProps { 
    slideId: string;
    fields: Field[];
    src: string; 
    alt: string;
    currentSlideId: string;
    handleSlideSelection: (id: string) => void;
}

export interface PreviewProps {
    // id: string;
    src: string;
    alt: string;
}

export interface CanvasProps {
    slideId: string;
    fields: Field [];
    src: string;
    alt: string;
}

export interface EditorData { 
    id: string; 
    content: string; 
    position: { x: number; y: number }; 
}

export interface HeadingColorButtonsProps {
    editor: Editor;
    // isActive: boolean;
    currentId: string;
    selectedId: string;
}

export interface MenuButtonProps extends HeadingColorButtonsProps {
    type: string;
    icon: ReactNode;
}

export interface Field {
    id: string;
    content: Content;
    position: {
        x: number;
        y: number;
    };
}

export interface EditorCustomOptions {
    handleDrag: (id: string, _: DraggableEvent, data: DraggableData) => void, 
    bounds: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    position: { x: number, y: number}
    selectedId: string,
    handleSelectedId: (id: string) => void;
    id: string;
}

export interface Slide {
    slideId: string;
    src: string;
    alt: string;
    fields: {
        id: string;
        content: string;
        position: { x: number; y: number}
    }[]
}

export interface PresentationType {
    presentationId: string;
    cover: string;
    creatorId: string;
    editorsId: string[];
    slides: Slide[];
}