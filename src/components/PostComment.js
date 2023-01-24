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
          <div className="post-cmt-imgContainer">
            <img className="post-cmt-img" src={user.profilePicUrl} alt='user profile pic' />
          </div>
        </Link>
        <p className="post-cmt-inner">
          <Link to={'/profile/' + cmt.uid}>
            <span className="cmt-name">{user.name}</span>
          </Link>
          {cmt.text}
        </p>
      </div>
      <p className="post-cmt-time">
        {Math.floor(time.time)}
        {time.format}
      </p>
    </div>
  )
}

export default PostComment;