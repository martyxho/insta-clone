import React, { useState, useEffect } from "react";
import { getUserFollowers, getUserFollows } from "../firebase";

function ProfileSidebar ({ user, postCount }) {

  return (
    <div className="profile-sidebar">
      <div>
        {user.name}
      </div>
      <div>
        {postCount} posts
      </div>
      <div>
      {user.followingCount} following {user.followersCount} followers 
      </div>
      <div>
        {user.bio}
      </div>
    </div>
  )
}

export default ProfileSidebar;