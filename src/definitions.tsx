import { Content, Editor } from "@tiptap/core";
import { ReactNode } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";

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

export interface HeadingColorButtonsProps {
    editor: Editor;
    // isActive: boolean;
    currentId: number;
    selectedId: number;
}

export interface MenuButtonProps extends HeadingColorButtonsProps {
    type: string;
    icon: ReactNode;
}

export interface Field {
    id: number;
    content: Content;
    position: {
        x: number;
        y: number;
    };
}

export interface EditorCustomOptions {
    handleDrag: (id: number, _: DraggableEvent, data: DraggableData) => void, 
    bounds: {
        left: number;
        top: number;
        right: number;
        bottom: number;
    };
    position: { x: number, y: number}
    selectedId: number,
    handleSelectedId: (id: number) => void;
    id: number;
}