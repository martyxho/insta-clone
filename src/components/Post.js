import React, { useState, useEffect } from "react";
import PostSidebar from "./PostSidebar";
import { useParams } from "react-router-dom";
import { getPost } from "../firebase";

function Post({ refresh }) {
  const { postID } = useParams();
  const [post, setPost] = useState('');

  useEffect(() => {
    async function get() {
      setPost(await getPost(postID));
    }
    get();
  }, [postID]);
  
  return (
    <div className="post-main">
      {post &&
        <div className="post-container">
          <img src={post.imageUrl} alt="post-img" className="post-img"/>
          <PostSidebar post={post} refresh={refresh}/>
        </div>
      }
    </div>
  )
}

export default Post;