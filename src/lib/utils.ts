import { Editor } from "@tiptap/core";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getActiveHeading = (editor: Editor) => {
  for (let i = 1; i <=6; i++) {
    if (editor.isActive('heading', { level: i })) return `h${i}`;
  }
  return 'paragraph';
};

export const getActiveColor = (editor: Editor) => {
  const { color } = editor.getAttributes('textStyle');
  return color || 'default';
};

export const getEditorMethod = (editor: Editor, type: string, option = 'default') => {
  const obj = option === 'check' ? editor.can().chain().focus() : editor.chain().focus();
  const methodMap: { [key: string]: () => void | boolean } = {
    'italic': () => obj.toggleItalic().run(),
    'bold': () => obj.toggleBold().run(),
    'strike': () => obj.toggleStrike().run(),
    'code': () => obj.toggleCode().run(),
    'code-block': () => obj.toggleCodeBlock().run(),
    'bullet-list': () => obj.toggleBulletList().run(),
    'ordered-list': () => obj.toggleOrderedList().run(),
    'blockquote': () => obj.toggleBlockquote().run(),
    'clear-marks': () => obj.unsetAllMarks().run(),
    'horizontal-rule': () => obj.setHorizontalRule().run(),
    'break': () => obj.setHardBreak().run(),
    'undo': () => obj.undo().run(),
    'redo': () => obj.redo().run(),
  };

  return methodMap[type] || (() => false);
};
