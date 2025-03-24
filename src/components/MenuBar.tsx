import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./menu-buttons/MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";
import { useCurrentEditor } from "@tiptap/react";

export default function MenuBar ({ 
    selectedId,
    currentId,
    shift
} : { 
    selectedId: number; 
    currentId: number;
    shift: number;
}) {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
      <>
          {selectedId === currentId && (
              <div
                style={{ left: `${shift}px` }}
                className="absolute  top-[-60px] control-group w-[732px] p-2 rounded-xl bg-white border-gray-300 ">
                  <div className="button-group flex w-[732px] gap-2">
                      <HeadingButton  />
                      <ColorButton/>
                      {buttons.map(button => (
                          <MenuButton 
                            key={button.id}
                            type={button.type}
                            icon={button.icon}
                          />
                      ))}
                  </div>
              </div>
          )}
      </>
    )
}