import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../firebase";
import calcTime from "../utils/calcTime";

function PostComment ({ cmt }) {
  const [user, setUser] = useState('');
  const time = calcTime(cmt.timestamp);

  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(cmt.uid);
      setUser(user);
    }
    setName();
  }, [cmt]);

  return (
    <div className="post-cmt">
      <div className="post-cmt-start">
        <Link to={'/profile/' + cmt.uid}>
          <img className="post-cmt-user-pic" src={user.profilePicUrl} alt='user profile pic' />
        </Link>
        <div className="post-cmt-inner">
          <Link to={'/profile/' + cmt.uid}>
            <p className="post-cmt-username">{user.name}</p>
          </Link>
          <p className="post-cmt-text">{cmt.text}</p>
        </div>
      </div>
      <p className="elapsed-time">
        {Math.floor(time.time)}
        {time.format}
      </p>
    </div>
  )
}

export default PostComment;