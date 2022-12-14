import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { checkFollow, followUser, unfollowUser } from "../firebase";


function ProfileTopRight ({ cUser, userID, openPostForm, refresh }) {
  const [follow, setFollow] = useState(false);
  
  useEffect(() => {
    async function setState() {
      setFollow(await checkFollow(userID));
    }
    setState();
  },[userID]);

  async function handleFollow() {
    await followUser(userID);
    setFollow(true);
    refresh();
  }

  async function handleUnfollow() {
    await unfollowUser(userID);
    setFollow(false);
    refresh();
  }

  return (
    <div className="profile-topRight">
      {cUser && (cUser.uid === userID) &&
        <div>
          <Link to='/settings' ><button className="profile-editBtn">Edit Profile</button></Link>
          <button className="profile-postBtn" onClick={openPostForm} >+</button>
        </div>
      }
      {(cUser && (cUser.uid !== userID)) && 
        <div>
          {follow && 
            <button className="profile-editBtn" onClick={handleUnfollow}>UnFollow</button>
          }
          {!follow &&
            <button className="profile-editBtn" onClick={handleFollow}>Follow</button>
          }
          <button className="profile-postBtn">btn</button>
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