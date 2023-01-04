import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../firebase";

function CardComment({ uid, text }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(uid);
      setUsername(user.name);
    }
    setName()
  }, [uid]);

  return (
    <div className="card-cmt-container">
      <p>
        <Link to={'/profile/' + uid}>
          <span className="cmt-name">{username}</span>
        </Link>
        {text}
      </p>
    </div>
  )
}

export default CardComment;