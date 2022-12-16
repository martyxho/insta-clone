import React, { useState, useEffect } from "react";
import PostSidebar from "./PostSidebar";
import { useParams } from "react-router-dom";
import { getPost } from "../firebase";

function Post({ cUser }) {
  const { postID } = useParams();
  const [post, setPost] = useState('');

  useEffect(() => {
    get();
  }, [postID]);

  async function get() {
    setPost(await getPost(postID));
  }
  
  return (
    <div className="post-main">
      {post &&
        <div className="post-container">
          <div className="post-img-container">
            <img src={post.imageUrl} alt="post-img" className="post-img"/>
          </div>
          <PostSidebar post={post} refresh={get} cUser={cUser}/>
        </div>
      }
    </div>
  )
}

export default Post;