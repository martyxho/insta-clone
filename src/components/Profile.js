import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../firebase";
import ProfileSidebar from "./ProfileSidebar";
import ProfileFeed from "./ProfileFeed";
import PostForm from "./PostForm";

function Profile () {
  const {userID} = useParams();
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState('');
  const [postForm, setPostForm] = useState('');

  useEffect(() => {
    async function getUser() {
      const user = await getUserProfile(userID);
      setUser(user);
    }
    getUser();
    refreshPosts(userID);
  }, [userID]);

  async function refreshPosts() {
    setPosts(await getUserPosts(userID));
  }

  function openPostForm() {
    setPostForm(true);
  }

  function closePostForm() {
    setPostForm(false);
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-hero" alt="banner" src={user.bannerURL}/>
      </div>
      <div className="profile-outer">
        <div className="profile-imgContainer">
          <img className="profile-img" alt="user profile img" src={user.profilePicUrl} />
        </div>
        <div className="profile-topRight">
          <Link to='/settings' ><button className="profile-editBtn">Edit Profile</button></Link>
          <button className="profile-postBtn" onClick={openPostForm} >+</button>
        </div>
      </div>
      {user &&
        <div className="profile-inner">
          <ProfileSidebar user={user} postCount={posts.length} />
          <ProfileFeed posts={posts} />
        </div>
      }
      {postForm &&
        <PostForm refresh={refreshPosts} close={closePostForm} />
      }
    </div>
  )
}

export default Profile;