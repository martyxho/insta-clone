function ProfileSidebar ({ user, postCount, openFollow }) {

  function openFollowing() {
    openFollow(true);
  }

  function openFollowers() {
    openFollow(false);
  }

  return (
    <div className="profile-sidebar">
      <div className="profile-sidebar-userContainer">
        <h2 className="profile-sidebar-username">{user.name}</h2>
      </div>
      <div className="profile-sidebar-infoContainer">
        <div className="profile-sidebar-postsContainer">
          <h3>{postCount}</h3>
          <p className="profile-sidebar-posts">Posts</p>
        </div>
        <div className="profile-sidebar-userInfo">
          <div className="profile-sidebar-followContainer" onClick={openFollowing}>
            <h3>{user.following.length}</h3> 
            <p className="profile-sidebar-follow">Following</p>
          </div>
          <div className="profile-sidebar-followContainer" onClick={openFollowers}>
            <h3>{user.followers.length}</h3> 
            <p className="profile-sidebar-follow">Followers</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="profile-sidebar-bioHeader">Bio</h3>
        <p className="profile-sidebar-bioText">{user.bio}</p>
      </div>
    </div>
  )
}

export default ProfileSidebar;