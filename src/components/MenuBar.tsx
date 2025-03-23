import { Editor } from "@tiptap/core"
import { Button } from "./ui/button";
import HeadingButton from "./menu-buttons/heading-button";
import MenuButton from "./MenuButton";
import { buttons } from "@/constants";
import ColorButton from "./menu-buttons/color-button";


export default function MenuBar ({ editor } : { editor: Editor | null }) {

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="control-group p-2 bg-gray-100 border-b border-gray-300 rounded-xl ">
        <div className="button-group flex flex-wrap gap-2">
          <HeadingButton editor={editor} />
          
          {buttons.map(button => (
            <MenuButton 
              key={button.id}
              editor={editor}
              type={button.type}
              icon={button.icon}
            />
          ))}
          {/* <Button
            onClick={() => editor.chain().focus().setColor('#958DF1').run()}
            disabled={!editor.can().chain().focus().setColor('#958DF1').run()}
            className={`px-2 py-1 rounded ${editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-blue-600 hover:text-white`}
          >
            <div className="h-[10px] w-[10px] bg-[#008000]"></div>
            <span>Green </span>
          </Button> */}
          <ColorButton editor={editor} />
          <Button
            onClick={() => editor.chain().focus().run()}
          >
            Click
          </Button>

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