import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile } from "../firebase";
import CardComments from "./CardComments";
import PostButtons from './PostButtons';

function Card ({ post, refresh }) {
  const { postID, uid, imageUrl, profilePicUrl, likes, text } = post;
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(uid);
      setUsername(user.name);
    }
    setName()
  }, [uid]);

  return (
    <div className="card">
      <div className="card-header">
        <Link to={'/profile/' + uid} >
          <img src={profilePicUrl} className='user-pic' alt="user-pic" referrerPolicy="no-referrer"/>
          <div className="user-name">
            {username}
          </div>
        </Link>
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