import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../firebase";

function PostComment ({ cmt }) {
  const [username, setUsername] = useState('');
  const [time, setTime] = useState({format: '', time: ''});

  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(cmt.uid);
      setUsername(user.name);
    }
    setName();
    calcTime();
  }, [cmt]);

  function calcTime() {
    const time = cmt.timestamp.toDate();
    const current = new Date();
    const elapsed = current - time;
    const seconds = elapsed / 1000;
    if (seconds < 1) {
      setTime({format: 's', time: 1});
    } else if (seconds < 60) {
      setTime({format: 's', time: seconds});
    } else if (seconds < 3600) {
      setTime({format: 'm', time: seconds / 60});
    } else if (seconds < 86400) {
      setTime({format: 'h', time: seconds / 3600});
    } else if (seconds < 604800) {
      setTime({format: 'd', time: seconds / 86400});
    } else if (seconds < 2592000) {
      setTime({format: 'w', time: seconds / 604800});
    } else if (seconds < 31536000) {
      const months = seconds / 2592000;
      const formatStr = months > 1 ? 'mths' : 'mth';
      setTime({ format: formatStr, time: months });
    } else {
      const years = seconds / 31536000;
      const formatStr = years > 1 ? 'yrs' : 'yr';
      setTime({ format: formatStr, time: years });
    }
  }

  return (
    <div className="post-cmt">
      <div className="post-cmt-start">
        <Link to={'/profile/' + cmt.uid}>
          <img className="post-cmt-user-pic" src={cmt.profilePicUrl} alt='user profile pic' />
        </Link>
        <div className="post-cmt-inner">
          <Link to={'/profile/' + cmt.uid}>
            <p className="post-cmt-username">{username}</p>
          </Link>
          <p className="post-cmt-text">{cmt.text}</p>
        </div>
      </div>
      <p className="post-cmt-time">
        {Math.floor(time.time)}
        {time.format}
      </p>
    </div>
  )
}

export default PostComment;