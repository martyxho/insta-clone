import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, checkFollow, followUser, unfollowUser } from "../firebase";
import CardComments from "./CardComments";
import PostButtons from './PostButtons';

function Card ({ post, refresh, cUser, openSignUp }) {
  const { postID, uid, imageUrl, likes, likesCount, text } = post;
  const [user, setUser] = useState('');
  const [follow, setFollow] = useState('');
  const [overlay, setOverlay] = useState('');

  useEffect(() => {
    async function setState() {
      const user = await getUserProfile(uid);
      setUser(user);
      const follow = cUser ? await checkFollow(uid) : false;
      setFollow(follow);
    }
    setState();
  }, [post, cUser]);

  function openOverlay() {
    if (cUser && cUser.uid === uid) {
      setOverlay(1);
    } else if (cUser) {
      setOverlay(2);
    } else {
      setOverlay(3);
    }
  }

  function closeOverlay() {
    setOverlay('');
  }

  async function handleFollow() {
    closeOverlay();
    await followUser(user);
    refresh();
  }

  async function handleUnfollow() {
    closeOverlay();
    await unfollowUser(user);
    refresh();
  }

  function handleOpenLogin() {
    openSignUp();
    closeOverlay();
  }

  return (
    <div className="card">
      {(overlay) &&
        <div className="overlay">
          <button className="overlay-close" onClick={closeOverlay}>X</button>
          {overlay === 1 &&
            <Link to={'/settings'}><button className="overlay-btn">Edit Profile</button></Link>
          }
          {overlay === 2 && follow &&
            <button className="overlay-btn" onClick={handleUnfollow}>Unfollow</button>
          }
          {overlay === 2 && !follow && 
            <button className="overlay-btn" onClick={handleFollow}>Follow</button>
          }  
          {overlay === 3 &&
            <button className="overlay-btn" onClick={handleOpenLogin}>Login</button>
          }
        </div>
      }
      <div className="card-header">
        <Link to={'/profile/' + uid} >
          <div className="card-userInfo">
            <img src={user.profilePicUrl} className='card-user-pic' alt="user-pic" referrerPolicy="no-referrer"/>
            <div className="user-name">
              {user.name}
            </div>
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
        <div className="card-btns-container">
          <PostButtons postID={postID} likes={likes} likesCount={likesCount} refresh={refresh} />
          <button>Share</button>
        </div>
        <CardComments postID={postID} refresh={refresh} />
      </div>
    </div>
  )
}

export default Card;