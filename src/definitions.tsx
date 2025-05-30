import { Content, Editor } from "@tiptap/core";
import { ReactNode } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";

export interface SlidesListProps {
    slides: Slide[] | undefined;
    currentSlideId: string;
    handleSlideSelection: (id: string) => void;
    role: 'viewer' | 'editor' | 'creator' | undefined;
    title: string | undefined
    author: string | undefined;
    isPresentMode: boolean;
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
    // slide: Slide | null;
    presentation: PresentationType | null
}

export interface CanvasProps {
    slideId: string;
    fields: Field [];
    src: string;
    alt: string;
    role: 'viewer' | 'editor' | 'creator' | undefined;
}

export interface EditorData { 
    id: string; 
    content: string; 
    position: { x: number; y: number }; 
}

export interface HeadingColorButtonsProps {
    editor: Editor;
    currentId: string;
    selectedId: string;
    handleSelectedId: (id: string) => void
}

export interface MenuButtonProps extends HeadingColorButtonsProps {
    type: string;
    icon: ReactNode;
    handleSelectedId: (id: string) => void
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
    creatorId: string;
    title: string;
    editorsId: string[];
    slides: Slide[];
}

export interface UserType {
    socketId: string;
    presentationId: string;
    username: string;
    role: 'viewer' | 'editor' | 'creator';
}