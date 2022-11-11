import React, { useState } from "react";
import { getUser, addComment } from "../firebase";

function CommentForm({postID, refresh, setData}) {
  const [value, setValue] = useState('');

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSend() {
    const user = getUser();
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
      <form>
        <input type='text' placeholder="Add a comment..." value={value} onChange={handleChange}/>
      </form>
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default CommentForm;