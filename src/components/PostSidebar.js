import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, getComments } from "../firebase";
import PostComments from "./PostComments";
import PostButtons from "./PostButtons";
import CommentForm from "./CommentForm";
import PostMenuOpen from "./PostMenuOpen";
import Likes from "./Likes";
import calcTime from "../utils/calcTime";

function PostSidebar({ post, refresh, cUser }) {
  const { text, uid, postID, likes, timestamp } = post;
  const [user, setUser] = useState('');
  const [comments, setComments] = useState('');
  const time = calcTime(timestamp);
  const [likesCount, setLikesCount] = useState(likes.length);

  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(uid);
      setUser(user);
    }
    setName()
  }, [uid]);

  useEffect(() => {
    setData();
  }, [postID]);

  async function setData() {
    const x = await getComments(postID, 50);
    setComments(x);
  }

  function updateLikesCount(count) {
    setLikesCount(count);
  }

  return (
    <div className="post-sidebar">
      <div className="post-sidebar-top">
        <Link to={'/profile/' + uid}>
          <div className="post-sidebar-profileContainer">
              <div className="post-sidebar-imageContainer">
                <img src={user.profilePicUrl} alt='user profile pic' className='post-sidebar-profileImg' />
                <img src={user.profilePicUrl} alt='user profile pic' className='post-sidebar-profileImgBlur' />
              </div>
              <div className="post-sidebar-nameContainer">
                <h2>{user.name}</h2>
              </div>
          </div>
        </Link>
        <div className="post-caption">
          {text}
        </div>
      </div>
      <PostComments comments={comments}/>
      <div className="post-sidebar-footer">
        <div className="post-btns-container">
          <PostButtons postID={postID} likes={likes} updateLikesCount={updateLikesCount} refresh={refresh} />
          <PostMenuOpen postID={postID} uid={uid} cUser={cUser} />
        </div>
        <div className="post-sidebar-infoContainer">
          <Likes count={likesCount} className={'post-sidebar-likes'}/>
          <p className="post-sidebar-time">
            {Math.floor(time.time)}
            {time.format}
          </p>
        </div>
        <CommentForm postID={postID} refresh={refresh} setData={setData} className={'post-sidebar-commentBox'}/>
      </div>
    </div>
  )
}

export default PostSidebar;