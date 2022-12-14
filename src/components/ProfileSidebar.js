import React, { useState, useEffect } from "react";
import { getUserFollowers, getUserFollows } from "../firebase";

function ProfileSidebar ({ user, postCount }) {
  const [following, setFollowing] = useState('');
  const [followers, setFollowers] = useState('');

  useEffect(() => {
    async function setInfo() {
      setFollowers(await getUserFollowers(user.uid));
      setFollowing(await getUserFollows(user.uid));
    }
    setInfo();
  }, [user]);

  return (
    <div className="profile-sidebar">
      <div>
        {user.name}
      </div>
      <div>
        {postCount} posts
      </div>
      <div>
      {following.length} following {followers.length} followers 
      </div>
      <div>
        {user.bio}
      </div>
    </div>
  )
}

export default ProfileSidebar;