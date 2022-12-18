import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, updateLikes } from "../firebase";
import heart from '../assets/heart-outline.svg';

function PostButtons ({ postID, likes, likesCount, refresh }) {

  const path = `/post/${postID}`;

  async function handleLike() {
    const user = getCurrentUser();
    if (user) {
      if (likes.includes(user.uid)) {
        const newLikes = likes.filter(e => e !== user.uid);
        await updateLikes(postID, newLikes, likesCount - 1);
      } else {
        const newLikes = [...likes, user.uid];
        await updateLikes(postID, newLikes, likesCount + 1);
      }
      refresh();
    }
  }

  
  return (
    <div className="post-btns-div">
      <div className="card-btns">
        <img className='card-btn' alt='heart' src={heart} onClick={handleLike} />
        <Link to={path}>View Post</Link>
        <button>btn</button>
      </div>
      <div className="card-likes">
        {likesCount} likes
      </div>
    </div>
  )
}

export default PostButtons;