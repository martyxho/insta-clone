import React, { useState, useEffect } from "react";
import { getUser, getUserName, updateLikes } from "../firebase";
import CardComments from "./CardComments";
import heart from '../assets/heart-outline.svg';

function Card ({ postID, userPicUrl, uid, imageUrl, caption, likes, refresh }) {
  const [username, setUsername] = useState('');
  const [likesCount, setLikesCount] = useState(likes.length);
  useEffect(() => {
    async function setName() {
      const username = await getUserName(uid);
      setUsername(username);
    }
    setName()
  }, [uid]);

  async function handleLike() {
    const user = getUser();
    if (user) {
      if (likes.includes(user.uid)) {
        setLikesCount(likes.length - 1);
        const newLikes = likes.filter(e => e !== user.uid);
        await updateLikes(postID, newLikes);
      } else {
        setLikesCount(likes.length + 1);
        const newLikes = [...likes, user.uid];
        await updateLikes(postID, newLikes);
      }
      refresh();
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
          {likesCount} likes
        </div>
        <CardComments postID={postID} refresh={refresh}/>
      </div>
    </div>
  )
}

export default Card;