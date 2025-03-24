import { Editor } from "@tiptap/core"
import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./menu-buttons/MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";


export default function MenuBar ({ editor, isActive } : { editor: Editor | null; isActive: boolean }) {

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="control-group ml-[200px] absolute top-[-55px] z-40 w-[732px] p-2 bg-white border-gray-300 ">
        <div className="button-group flex w-[732px] gap-2">
          <HeadingButton editor={editor} isEditing={isActive} />
          
          {buttons.map(button => (
            <MenuButton 
              key={button.id}
              editor={editor}
              type={button.type}
              icon={button.icon}
              isEditing={isActive}
            />
          ))}
          <ColorButton editor={editor} isEditing={isActive} />


          {/* <button
            onClick={() => console.log(editor.getHTML())}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white"
          >
            Get Html
          </button>
          <button
            onClick={() => console.log(editor.getJSON())}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 hover:text-white"
          >
            Get Json
          </button> */}
          
        </div>
      </div>
    </>
  )
}