import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./menu-buttons/MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";
import { MenuBarProps } from "@/definitions";


export default function MenuBar ({ 
  editor, 
  handleRender 
} : MenuBarProps) {
  // console.log(editor)

  if (!editor) {
    return null
  }


  return (
    <>
      <div className="control-group w-[732px] p-2 bg-white border-gray-300 ">
        <div className="button-group flex w-[732px] gap-2">
          <HeadingButton editor={editor} handleRender={handleRender} />
          
          {buttons.map(button => (
            <MenuButton 
              key={button.id}
              editor={editor}
              type={button.type}
              icon={button.icon}
            
              handleRender={handleRender}

            />
          ))}
          <ColorButton editor={editor} handleRender={handleRender}/>


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