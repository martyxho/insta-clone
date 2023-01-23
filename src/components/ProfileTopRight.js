import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkFollow, followUser, unfollowUser } from "../firebase";


function ProfileTopRight ({ cUser, user, openPostForm, refresh }) {
  const [follow, setFollow] = useState(false);
  
  useEffect(() => {
    async function setState() {
      setFollow(await checkFollow(user.uid));
    }
    setState();
  },[user]);

  async function handleFollow() {
    await followUser(user);
    setFollow(true);
    refresh();
  }

  async function handleUnfollow() {
    await unfollowUser(user);
    setFollow(false);
    refresh();
  }

  return (
    <div className="profile-topRight">
      {cUser && (cUser.uid === user.uid) &&
        <div className="profile-topBtnRow">
          <Link to='/settings' ><button className="profile-editBtn">Edit Profile</button></Link>
          <button className="profile-postBtn" onClick={openPostForm} >+</button>
        </div>
      }
      {(cUser && (cUser.uid !== user.uid)) && 
        <div className="profile-topBtnRow">
          {follow && 
            <button className="profile-editBtn" onClick={handleUnfollow}>Unfollow</button>
          }
          {!follow &&
            <button className="profile-editBtn" onClick={handleFollow}>Follow</button>
          }
          <button className="profile-actionBtn">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" className="action-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M470.3 271.15L43.16 447.31a7.83 7.83 0 01-11.16-7V327a8 8 0 016.51-7.86l247.62-47c17.36-3.29 17.36-28.15 0-31.44l-247.63-47a8 8 0 01-6.5-7.85V72.59c0-5.74 5.88-10.26 11.16-8L470.3 241.76a16 16 0 010 29.39z"></path></svg>
          </button>
        </div>
      }
      {!cUser && 
        <div>
          <button className="profile-editBtn">Follow</button>
          <button className="profile-postBtn">btn</button>
        </div>
      }
    </div>
)
}

export default ProfileTopRight;