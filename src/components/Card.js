import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, getCurrentUser, checkFollow, followUser, unfollowUser } from "../firebase";
import CardComments from "./CardComments";
import PostButtons from './PostButtons';

function Card ({ post, refresh }) {
  const { postID, uid, imageUrl, profilePicUrl, likes, text } = post;
  const [username, setUsername] = useState('');
  const [follow, setFollow] = useState('');
  const [overlay, setOverlay] = useState('');

  useEffect(() => {
    async function setState() {
      const user = await getUserProfile(uid);
      setUsername(user.name);
      const follow = await checkFollow(uid);
      setFollow(follow);
    }
    setState();
  }, [uid]);

  function openOverlay() {
    if (getCurrentUser().uid === uid) {
      setOverlay(1);
    } else {
      setOverlay(2);
    }
  }

  function closeOverlay() {
    setOverlay('');
  }

  function handleFollow() {
    followUser(uid);
    setFollow(true);
    closeOverlay();
  }

  function handleUnfollow() {
    unfollowUser(uid);
    setFollow(false);
    closeOverlay();
  }

  return (
    <div className="card">
      {(overlay) &&
        <div className="overlay">
          <button className="overlay-close" onClick={closeOverlay}>X</button>
          {overlay === 1 &&
            <button className="overlay-btn">Edit Profile</button>
          }
          {overlay === 2 && follow &&
            <button className="overlay-btn" onClick={handleUnfollow}>Unfollow</button>
          }
          {overlay === 2 && !follow && 
            <button className="overlay-btn" onClick={handleFollow}>Follow</button>
          }  
        </div>
      }
      <div className="card-header">
        <Link to={'/profile/' + uid} >
          <img src={profilePicUrl} className='user-pic' alt="user-pic" referrerPolicy="no-referrer"/>
          <div className="user-name">
            {username}
          </div>
        </Link>
        <div className="card-ext-btn" onClick={openOverlay} >
          ...
        </div>
      </div>
      <img src={imageUrl} className="main-img" alt="pic"/>
      <div className="card-footer">
        <div className="caption">
          {text}
        </div>
        <PostButtons postID={postID} likes={likes} refresh={refresh} />
        <CardComments postID={postID} refresh={refresh} />
      </div>
    </div>
  )
}

export default Card;