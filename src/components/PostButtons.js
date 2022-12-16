import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, updateLikes } from "../firebase";
import heart from '../assets/heart-outline.svg';
import PostExtraMenu from "./PostExtraMenu";

function PostButtons ({ postID, uid, likes, refresh }) {

  const [likesCount, setLikesCount] = useState(likes.length);
  const [extra, setExtra] = useState(false);
  const path = `/post/${postID}`;

  async function handleLike() {
    const user = getCurrentUser();
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

  function openExtra() {
    setExtra(true);
  }

  function closeExtra() {
    console.log('close');
    setExtra(false);
  }
  
  return (
    <div className="post-btns-div">
      <div className="card-btns">
        <div className="card-btns-left">
          <img className='card-btn' alt='heart' src={heart} onClick={handleLike} />
          <Link to={path}>View Post</Link>
          <button>btn</button>
        </div>
        <div className="card-btns-right">
          <button onClick={openExtra}>...</button>
          {extra && 
            <PostExtraMenu close={closeExtra} postID={postID} uid={uid}/>
          }
        </div>
      </div>
      <div className="card-likes">
        {likesCount} likes
      </div>
    </div>
  )
}

export default PostButtons;