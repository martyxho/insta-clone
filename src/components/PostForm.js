import React, { useState } from "react";
import { uploadPost } from "../firebase";

function PostForm ({ close }) {
  const [text, setText] = useState('');

  function handleTextChange(e) {
    setText(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fileInput = document.getElementById('pic-input');
    const file = fileInput.files[0];
    if (file) {
      uploadPost(file, text);
      close();
    }
  }

  return (
    <div className="upload_container">
      <div className="upload_header">
        <h3>Create New Post</h3>
        <button onClick={close}>x</button>
      </div>
      <div className="upload_input_container">
        <div>
          <input id='pic-input' type='file' accept="image/jpeg, image/png, image/jpg"/>
        </div>
        <div>
          <textarea value={text} onChange={handleTextChange} placeholder='caption'></textarea>
        </div>
      </div>
      <button type="submit" onClick={handleSubmit}>Post</button>
    </div>
  )
}

export default PostForm;

