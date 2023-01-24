import React, { useState } from "react";
import { uploadPost } from "../firebase";

function PostForm ({ close, refresh }) {
  const [text, setText] = useState('');
  const [preview, setPreview] = useState(false);

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleFile(e) {
    const file = e.target.files[0];
    const img = document.getElementById('upload_preview');
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    }
    reader.readAsDataURL(file);
    setPreview(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.style.cursor = 'wait';
    const fileInput = document.getElementById('upload_fileInput');
    const file = fileInput.files[0];
    if (file) {
      e.target.disabled = true;
      await uploadPost(file, text);
      close();
    }
    refresh();
  }

  return (
    <div className="upload_modal">
      <div className="upload_container">
        <div className="upload_header">
          <h3>Create New Post</h3>
          <svg onClick={close} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="upload_close" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"></path></svg>
        </div>
        <div className="upload_topContainer">
          <img id="upload_preview" style={preview ? {} : {display: 'none'}}/>
          <div className="upload_uploadContainer" style={preview ? {display: 'none'} : {}}>
            <label className="upload_btnContainer">
              <input id='upload_fileInput' type='file' accept="image/jpeg, image/png, image/jpg" onChange={handleFile}/>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="upload_uploadIcon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 367.79h76c55 0 100-29.21 100-83.6s-53-81.47-96-83.6c-8.89-85.06-71-136.8-144-136.8-69 0-113.44 45.79-128 91.2-60 5.7-112 43.88-112 106.4s54 106.4 120 106.4h56"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 255.79l-64-64-64 64m64 192.42V207.79"></path></svg>
              <p>File size limit 5 mb.</p>
            </label> 
          </div>
          <div>
            <div className="upload_captionContainer">
              <textarea className="upload_captionInput" name='caption' maxLength={150} value={text} onChange={handleTextChange} placeholder='Enter Caption...'></textarea>
            </div>
          </div>
        </div>
        <button className={"upload_postBtn" + (preview ? ' valid' : '')} type="submit" onClick={handleSubmit}>Post</button>
      </div>
    </div>
  )
}

export default PostForm;

