import React, { useState, useEffect } from "react";
import { getUser, getUserName, updateLikes } from "../firebase";

function PostSidebar({post}) {
  const { profilePicUrl, text, uid, postID, likes, timestamp } = post;
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function setName() {
      const username = await getUserName(uid);
      setUsername(username);
    }
    setName()
  }, [uid]);

  return (
    <div className="post-sidebar">
      <div className="post-header">
        <div className="post-user">
          <img src={profilePicUrl} className='post-profile-img' />
          <div className="user-info">
            {username}
          </div>
          {text}
        </div>
      </div>
    </div>
  )
}

export default PostSidebar;