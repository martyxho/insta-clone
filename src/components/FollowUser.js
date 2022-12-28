import React, { useState, useEffect } from "react";
import { getUserProfile, checkFollow, followUser, unfollowUser } from "../firebase";

function FollowUser ({uid, refresh}) {
  const [user, setUser] = useState('');
  const [follow, setFollow] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function setState() {
      setFollowState();
      setUser(await getUserProfile(uid));
    }
    setState();
  }, [uid]);

  async function setFollowState() {
    setFollow(await checkFollow(uid));
  }

  async function handleFollow() {
    setDisabled(true);
    await followUser(user);
    await setFollowState();
    setDisabled(false);
    refresh();
  }

  async function handleUnfollow() {
    setDisabled(true);
    await unfollowUser(user);
    await setFollowState();
    setDisabled(false);
    refresh();
  }

  return (
    <div className="followUser">
      <div className="follow_user_container">
        <div className="follow_avatar_container">
          <img className="userPic" src={user.profilePicUrl} alt='user profile pic'/>
        </div>
        <div className="follow_user_info">
          <p>{user.name}</p>
        </div>
      </div>
      {user &&
        <div>
          {follow &&
            <button onClick={handleUnfollow} disabled={disabled}>Unfollow</button>
          }
          {!follow &&
            <button onClick={handleFollow} disabled={disabled}>Follow</button>
          }
        </div>
      }
    </div>
  )
}

export default FollowUser;