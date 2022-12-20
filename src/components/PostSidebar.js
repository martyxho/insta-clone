import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, getComments } from "../firebase";
import PostComments from "./PostComments";
import PostButtons from "./PostButtons";
import CommentForm from "./CommentForm";
import ExtraButton from "./ExtraButton";
import calcTime from "../utils/calcTime";

function PostSidebar({post, refresh, cUser }) {
  const { text, uid, postID, likes, likesCount, timestamp } = post;
  const [user, setUser] = useState('');
  const [comments, setComments] = useState('');
  const time = calcTime(timestamp);

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

  return (
    <div className="post-sidebar">
      <div className="post-header">
        <div className="post-user">
          <Link to={'/profile/' + uid}>
            <img src={user.profilePicUrl} alt='user profile pic' className='post-profile-img' />
            <div className="user-info">
              {user.name}
            </div>
          </Link>
        </div>
        <div className="post-caption">
          {text}
        </div>
      </div>
      <PostComments comments={comments}/>
      <div className="post-footer">
        <div className="post-btns-container">
          <PostButtons postID={postID} likes={likes} likesCount={likesCount} refresh={refresh} />
          <div className="post-btns-right">
            <ExtraButton postID={postID} uid={uid} cUser={cUser} />
            <p className="elapsed-time">
              {Math.floor(time.time)}
              {time.format}
            </p>
          </div>
        </div>
        <CommentForm postID={postID} refresh={refresh} setData={setData}/>
      </div>
    </div>
  )
}

export default PostSidebar;