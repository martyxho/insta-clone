import React, { useState } from "react";
import { getCurrentUser, addComment } from "../firebase";

function CommentForm({postID, refresh, setData}) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSend(e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (user && value) {
      const text = value;
      setValue('');
      await addComment(postID, text);
      setData();
      refresh();
    }
  }

  return (
    <div className="comment-box">
      <form className="comment-form" onSubmit={handleSend}>
        <input className="comment-input" type='text' placeholder="Add a comment..." value={value} onChange={handleChange}/>
      </form>
      <div className="svg-div" onClick={handleSend}>
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"></path>
        </svg>
      </div>
    </div>
  )
}

export default CommentForm;