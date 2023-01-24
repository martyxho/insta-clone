import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser, updateLikes } from "../firebase";

function PostButtons ({ postID, likes, refresh, updateLikesCount }) {

  const path = `/post/${postID}`;
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  
  useEffect(() => {
    if (user) {
      if (likes.includes(user.uid)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    } 
  },[likes, user]);

  async function handleLike() {
    if (user) {
      if (likes.includes(user.uid)) {
        const newLikes = likes.filter(e => e !== user.uid);
        updateLikesCount(newLikes.length);
        setLiked(false);
        updateLikes(postID, newLikes);
      } else {
        const newLikes = [...likes, user.uid];
        updateLikesCount(newLikes.length);
        setLiked(true);
        updateLikes(postID, newLikes);
      }
      refresh();
    }
  }

  
  return (
    <div className="post-btns-div">
      <div className="card-btns">
        {liked && 
          <div className="post-btn-div svg-div">
            <svg onClick={handleLike} className='post-btn heart' viewBox="0 0 24 24">
              <path fill="#F44336" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
            </svg>
          </div>
        }
        {!liked &&
          <div className="post-btn-div svg-div">
            <svg onClick={handleLike} className='post-btn' id="heart" viewBox="0 0 24 24">
              <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
            </svg>
          </div>
        }
        <Link to={path}>
          <div className="post-btn-div svg-div">
            <svg className="post-btn" viewBox="0 0 24 24">
              <path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </div>
        </Link>
        <Link to={path}>
          <div className="post-btn-div svg-div">
            <svg className="post-btn" viewBox="0 0 24 24">
              <line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line>
              <polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon>
            </svg>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default PostButtons;