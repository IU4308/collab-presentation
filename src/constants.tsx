import Color from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import { FaBold } from 'react-icons/fa'
import { GoItalic, GoListOrdered } from "react-icons/go";
import { GoListUnordered } from "react-icons/go";
import { GrBlockQuote } from "react-icons/gr";
import { FaCode } from "react-icons/fa6";
import { CiEraser } from "react-icons/ci";
import { HiOutlineStrikethrough } from "react-icons/hi2";
import { VscHorizontalRule } from "react-icons/vsc";
import { RxLinkBreak1 } from "react-icons/rx";
import { CiUndo } from "react-icons/ci";
import { CiRedo } from "react-icons/ci";
import { PiBracketsCurlyLight } from "react-icons/pi";

export const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Highlight,
  Typography,
]

export const buttons = [
  {
    id: 1,
    type: 'bold',
    icon: <FaBold  />
  },
  {
    id: 2,
    type: 'italic',
    icon: <GoItalic />
  },
  {
    id: 3,
    type: 'strike',
    icon: <HiOutlineStrikethrough />
  },
  {
    id: 4,
    type: 'clear-marks',
    icon: <CiEraser />
  },
  {
    id: 5,
    type: 'bullet-list',
    icon: <GoListUnordered />
  },
  {
    id: 6,
    type: 'ordered-list',
    icon: <GoListOrdered />
  },
  {
    id: 7,
    type: 'blockquote',
    icon: <GrBlockQuote />
  },
  {
    id: 8,
    type: 'code',
    icon: <FaCode />
  },
  {
    id: 10,
    type: 'code-block',
    icon: <PiBracketsCurlyLight />
  },
  {
    id: 11,
    type: 'undo',
    icon: <CiUndo />
  },
  {
    id: 12,
    type: 'redo',
    icon: <CiRedo />
  },
  {
    id: 9,
    type: 'horizontal-rule',
    icon: <VscHorizontalRule />
  },
  {
    id: 13,
    type: 'break',
    icon: <RxLinkBreak1 />
  },
]

export const colors = [
  {
    id: 1,
    color: '#008000',
    label: 'green'
  },
  {
    id: 2,
    color: '#ff0000',
    label: 'red'
  },
  {
    id: 3,
    color: '#0000ff',
    label: 'blue'
  },
  {
    id: 4,
    color: '#FFFF00',
    label: 'yellow'
  },
  {
    id: 5,
    color: '#FFA500',
    label: 'orange'
  },
  {
    id: 6,
    color: '#800080',
    label: 'purple'
  },
  {
    id: 7,
    color: '#00FFFF',
    label: 'cyan'
  },
  {
    id: 8,
    color: '#FFC0CB',
    label: 'pink'
  },
  {
    id: 9,
    color: '#A52A2A',
    label: 'brown'
  },
  {
    id: 10,
    color: '#000000',
    label: 'black'
  },
  {
    id: 11,
    color: '#FFFFFF',
    label: 'white'
  },
]


export const templates = [
    {
        id: 0,
        src: '/blank.jpg',
        alt: 'slide 0',
    },
    {
        id: 1,
        src: '/slide1.jpg',
        alt: 'slide 1',
    },
    {
        id: 2,
        src: '/slide2.jpg',
        alt: 'slide 2',
    },
    {
        id: 3,
        src: '/slide3.jpg',
        alt: 'slide 3',
    },
    {
        id: 4,
        src: '/slide4.jpg',
        alt: 'slide 4',
    },
    {
        id: 5,
        src: '/slide5.jpg',
        alt: 'slide 4',
    },
    {
        id: 6,
        src: '/slide6.jpg',
        alt: 'slide 4',
    },
    
]

