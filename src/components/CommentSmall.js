import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
      <Link to={'/profile/' + uid}>
        <div className="cmt-name">{username}</div>
      </Link>
      <div className="cmt-text">{text}</div>
    </div>
  )
}

export default CommentSmall;