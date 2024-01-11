import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ "list": "ordered" },
        { "list": 'bullet' },
        { 'indent': '-1' },
        { 'indent': '+1' }],
        ["link", "image", "video"],
        ["clean"]
    ],
};
export default function RichTextArea() {
    const [value, setValue] = useState('');

    return (
        <ReactQuill theme="snow"
            modules={modules}
            value={value}
            onChange={setValue}
            style={{
                height: '40vh', 
            }}
        />
    );
}
