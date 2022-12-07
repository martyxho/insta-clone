import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../firebase";
import ProfileSidebar from "./ProfileSidebar";
import ProfileFeed from "./ProfileFeed";

function Profile () {
  const {userID} = useParams();
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState('');

  useEffect(() => {
    async function getInfo() {
      const user = await getUserProfile(userID);
      const posts = await getUserPosts(userID);
      setUser(user);
      setPosts(posts);
      console.log(user);
    }
    getInfo();
  }, [userID]);

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
          <button className="profile-postBtn">+</button>
        </div>
      </div>
      <div className="profile-inner">
        <ProfileSidebar user={user} postCount={posts.length} />
        <ProfileFeed posts={posts} />
      </div>
    </div>
  )
}

export default Profile;