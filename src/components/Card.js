import React, { useState, useEffect } from "react";
import { getUser, getUserName, updateLikes } from "../firebase";
import heart from '../assets/heart-outline.svg';

function Card ({ postID, userPicUrl, uid, imageUrl, caption, likes }) {
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function setName() {
      const username = await getUserName(uid);
      setUsername(username);
    }
    setName()
  }, [uid]);

  function handleLike() {
    const user = getUser();
    if (user) {
      if (likes.includes(user.uid)) {
        const newLikes = likes.filter(e => e !== user.uid);
        updateLikes(postID, newLikes);
      } else {
        const newLikes = [...likes, user.uid];
        updateLikes(postID, newLikes);
      }
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <img src={userPicUrl} className='user-pic' alt="user-pic" referrerPolicy="no-referrer"/>
        <div className="user-name">
          {username}
        </div>
      </div>
      <img src={imageUrl} className="main-img" alt="pic"/>
      <div className="card-footer">
        <div className="caption">
          {caption}
        </div>
        <div className="card-btns">
          <img className='card-btn' alt='heart' src={heart} onClick={handleLike} />
          <button>btn</button>
          <button>btn</button>
        </div>
        <div className="card-likes">
          {likes.length} likes
        </div>
        <div className="card-commments">
          comments
        </div>
      </div>
    </div>
  )
}

export default Card;