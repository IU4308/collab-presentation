import { forwardRef } from "react";
import ReactQuill from "react-quill";

const CustomQuill = forwardRef(({
    ref,
    content,
    onChange
}) => (
    <ReactQuill  
        ref={ref} 
        value={content}
        onChange={onChange}
    />
));

export default CustomQuill;