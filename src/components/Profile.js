import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserProfile, getUserPosts } from "../firebase";
import ProfileSidebar from "./ProfileSidebar";
import ProfileFeed from "./ProfileFeed";
import PostForm from "./PostForm";
import ProfileTopRight from "./ProfileTopRight";
import FollowInfo from "./FollowInfo";

function Profile ({ cUser, refresh }) {
  const {userID} = useParams();
  const [user, setUser] = useState('');
  const [posts, setPosts] = useState('');
  const [postForm, setPostForm] = useState('');
  const [followInfo, setFollowInfo] = useState(false);

  useEffect(() => {
    refreshUser();
    refreshPosts();
  }, [userID]);

  async function refreshUser() {
    setUser(await getUserProfile(userID));
  }
  async function refreshPosts() {
    setPosts(await getUserPosts(userID));
    refresh();
  }

  function openPostForm() {
    setPostForm(true);
  }

  function closePostForm() {
    setPostForm(false);
  }

  function openFollow(tab1) {
    setFollowInfo({tab1: tab1});
  }

  function closeFollow () {
    setFollowInfo(false);
  }

  return (
    <div className="profile">
      {followInfo &&
        <FollowInfo cUser={cUser} close={closeFollow} tab1={followInfo.tab1} refresh={refresh} userID={userID}/>
      }
      <div className="profile-header">
        <img className="profile-hero" alt="banner" src={user.bannerURL}/>
      </div>
      <div className="profile-outer">
        <div className="profile-topSection">
          <div className="profile-imgContainer">
            <img className="profile-img" alt="user profile img" src={user.profilePicUrl} />
            <img className="profile-img blur" alt="user profile img" src={user.profilePicUrl} />
          </div>
          <ProfileTopRight cUser={cUser} user={user} openPostForm={openPostForm} refresh={refresh} />
        </div>
      </div>
      {user &&
        <div className="profile-inner">
          <ProfileSidebar user={user} postCount={posts.length} refresh={refresh} openFollow={openFollow}/>
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