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
      await setData();
      refresh();
    }
  }

  return (
    <div className="comment-form">
      <form onSubmit={handleSend}>
        <input type='text' placeholder="Add a comment..." value={value} onChange={handleChange}/>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default CommentForm;