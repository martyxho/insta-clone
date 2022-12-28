import React, { useState, useEffect } from "react";
import { getUserProfile } from "../firebase";

function FollowUser ({uid}) {
  const [user, setUser] = useState('');

  useEffect(() => {
    async function setState() {
      setUser(await getUserProfile(uid));
    }
    setState();
  }, [uid]);
  return (
    <div className="followUser">
      <div className="follow_avatar_container">
        <img className="userPic" src={user.profilePicUrl} alt='user profile pic'/>
      </div>
    </div>
  )
}

export default FollowUser;