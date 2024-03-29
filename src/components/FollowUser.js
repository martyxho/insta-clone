import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserProfile, checkFollow, followUser, unfollowUser } from "../firebase";

function FollowUser ({cUser, uid, refresh}) {
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

  async function handleFollow(e) {
    e.preventDefault();
    setDisabled(true);
    await followUser(uid);
    refresh();
    await setFollowState();
    setDisabled(false);
  }

  async function handleUnfollow(e) {
    e.preventDefault();
    setDisabled(true);
    await unfollowUser(uid);
    refresh();
    await setFollowState();
    setDisabled(false);
  }

  return (
    <Link to={'/profile/' + uid}>
      <div className="followUser">
        <div className="follow_user_container">
          <div className="follow_avatar_container">
            <img className="userPic" src={user.profilePicUrl} alt='user profile pic'/>
          </div>
          <div className="follow_user_info">
            <p className="follow_user_name">{user.name}</p>
          </div>
        </div>
        {user && uid !== cUser.uid && follow &&
          <button className="follow-btn" onClick={handleUnfollow} disabled={disabled}>Unfollow</button>
        }
        {user && uid !== cUser.uid && !follow &&
          <button className="follow-btn" onClick={handleFollow} disabled={disabled}>Follow</button>
        }
        {user && uid === cUser.uid &&
          <Link to='/settings'><button className="follow-btn">Edit Profile</button></Link>
        }
      </div>
    </Link>
  )
}

export default FollowUser;