import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, checkFollow, followUser, unfollowUser } from "../firebase";
import { getComments } from "../firebase";
import CardComments from "./CardComments";
import PostButtons from './PostButtons';
import Likes from "./Likes";
import CommentForm from "./CommentForm";

function Card ({ post, refresh, cUser}) {
  const { postID, uid, imageUrl, likes } = post;
  const [user, setUser] = useState('');
  const [follow, setFollow] = useState('');
  const [overlay, setOverlay] = useState('');
  const [likesCount, setLikesCount] = useState(likes.length);
  const [comments, setComments] = useState('');
  const path = window.location.host + '/post/' + postID;

  useEffect(() => {
    setData();
  }, []);

  async function setData() {
    const x = await getComments(postID);
    setComments(x);
  }

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

  function openShareOverlay() {
    setOverlay(4);
  }

  function closeOverlay() {
    setOverlay('');
  }

  function copyLink() {
    navigator.clipboard.writeText(path);
    closeOverlay();
  }

  async function handleFollow() {
    closeOverlay();
    await followUser(uid);
    refresh();
  }

  async function handleUnfollow() {
    closeOverlay();
    await unfollowUser(uid);
    refresh();
  }

  function updateLikesCount(count) {
    setLikesCount(count);
  }

  return (
    <div className="card">
      {(overlay) &&
        <div className="card-overlay">
          <div className="card-overlay-header">
            <svg onClick={closeOverlay} className="card-overlay-close" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M368 368L144 144m224 0L144 368"></path></svg>
          </div>
          <div className="card-overlay-main">
            {overlay === 1 &&
              <Link to={'/settings'}><button className="card-overlay-btn">Edit Profile</button></Link>
            }
            {overlay === 2 && follow &&
              <button className="card-overlay-btn" onClick={handleUnfollow}>Unfollow</button>
            }
            {overlay === 2 && !follow && 
              <button className="card-overlay-btn" onClick={handleFollow}>Follow</button>
            }  
            {overlay === 3 &&
              <Link to='/sign-up'><button className="card-overlay-btn">Login</button></Link>
            }
            {overlay === 4 &&
              <div className="card-overlay-share">
                <input className="card-overlay-link" readOnly={true} value={path} />
                <button className="card-overlay-btn" onClick={copyLink}>Copy Link</button>
              </div>
            }
          </div>
        </div>
      }
      <div className="card-container">
        <div className="card-header">
          <Link to={'/profile/' + uid} >
            <div className="card-userInfo">
              <img src={user.profilePicUrl} className='card-user-pic' alt="user-pic" referrerPolicy="no-referrer"/>
              <div className="card-username">
                {user.name}
              </div>
            </div>
          </Link>
          <div className="card-ext-btn" onClick={openOverlay} >
            <svg className="card-btn-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
          </div>
        </div>
        <Link to={'/post/' + postID}>
          <div className="main-img-div">
            <img src={imageUrl} className="main-img" alt="pic"/>
          </div>
        </Link>
        <div className="card-footer">
          <div className="card-btns-container">
            <PostButtons postID={postID} likes={likes} likesCount={likesCount} updateLikesCount={updateLikesCount} refresh={refresh} />
            <div className="svg-div" onClick={openShareOverlay}>
              <svg className="post-btn" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="256" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="384" cy="112" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle><circle cx="384" cy="400" r="48" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"></circle>
                <path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M169.83 279.53l172.34 96.94m0-240.94l-172.34 96.94"></path>
              </svg>
            </div>
          </div>
          <Likes count={likesCount} className={'card-likes'}/>
          <CardComments postID={postID} comments={comments} />
          <CommentForm postID={postID} refresh={refresh} setData={setData} className={'comment-box'}/>
        </div>
      </div>
      <img src={imageUrl} className='img-blur' alt='blur effect'/>
    </div>
  )
}

export default Card;