import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";

const Editor=()=> {

    const [text,setText] = useState('');

    const handleChange= (html?: any)=> {
        setText(html);
    }
    const modules = {
        toolbar: {
            container: "#toolbar",
        }
    }
    const formats = [
        'font','size',
        'bold','italic','underline','strike',
        'color','background',
        'script',
        'header','blockquote','code-block',
        'indent','list',
        'direction','align',
        'link','image','video','formula',
    ]

    return (
        <>
            <ReactQuill
                value={text}
                onChange={handleChange}
                modules={modules}
                formats={formats}
            />
        </>
    )
}



export default Editor;