import React, { useState, useEffect } from "react";
import { getUserName } from "../firebase";

function CommentSmall({ uid, text }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function setName() {
      const username = await getUserName(uid);
      setUsername(username);
    }
    setName()
  }, [uid]);

  return (
    <div className="cmt-sm">
      <div className="cmt-name">{username}</div>
      <div className="cmt-text">{text}</div>
    </div>
  )
}

export default CommentSmall;