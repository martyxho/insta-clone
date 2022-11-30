import React, { useState, useEffect } from "react";
import { getUserProfile } from "../firebase";

function CommentSmall({ uid, text }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(uid);
      setUsername(user.name);
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