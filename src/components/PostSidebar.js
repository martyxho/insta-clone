import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, getComments } from "../firebase";
import PostComments from "./PostComments";
import PostButtons from "./PostButtons";
import CommentForm from "./CommentForm";

function PostSidebar({post, refresh }) {
  const { profilePicUrl, text, uid, postID, likes, timestamp } = post;
  const [username, setUsername] = useState('');
  const [comments, setComments] = useState('');

  useEffect(() => {
    async function setName() {
      const user = await getUserProfile(uid);
      setUsername(user.name);
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
            <img src={profilePicUrl} alt='user profile pic' className='post-profile-img' />
            <div className="user-info">
              {username}
            </div>
          </Link>
        </div>
        <div className="post-caption">
          {text}
        </div>
      </div>
      <PostComments comments={comments}/>
      <div className="post-footer">
        <PostButtons postID={postID} likes={likes} refresh={refresh} />
        <CommentForm postID={postID} refresh={refresh} setData={setData}/>
      </div>
    </div>
  )
}

export default PostSidebar;