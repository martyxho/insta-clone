import React, { useState, useEffect } from "react";
import { getUser, addComment, getComments } from "../firebase";

function CardComments({ postID, refresh }) {
  const [value, setValue] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    setData();
  }, [postID]);

  async function setData() {
    const x = await getComments(postID);
    setComments(x);
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  async function handleSend() {
    const user = getUser();
    if (user && value) {
      await addComment(postID, value);
      setValue('');
      await setData();
      refresh();
    }
  }

  return (
    <div className="cmts-container">
      <p>View All Comments</p>
      <div className="cmts">
        {comments && 
          comments.map(e => <p>{e.text}</p>)
        }
      </div>
      <form>
        <input type='text' placeholder="Add a comment..." value={value} onChange={handleChange}/>
      </form>
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default CardComments;