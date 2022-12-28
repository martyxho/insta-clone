import { Link } from "react-router-dom";

function SidebarNav({ user, openUpload, openFollow }) {

  function followingClick() {
    openFollow(true);
  }

  function followersClick() {
    openFollow(false);
  }

  return (
    <div className="sidebar-nav">
      <div className="navBox 1" onClick={followingClick}>
        <div className="user-stat">
          <p>{user.followingCount}</p> 
        </div>
        <p>Following</p>
      </div>
      <div className="navBox 2" onClick={followersClick}>
        <div className="user-stat">
          <p>{user.followersCount}</p>
        </div>
        <p>Followers</p>
      </div>
      <Link to={'/profile/' + user.uid}>
        <div className="navBox 3">
          <div className="user-stat">
            <p>{user.postCount}</p>
          </div>
          <p>Posts</p>
        </div>
      </Link>
      <div className="navBox 4" onClick={openUpload}>
        <div className="user-stat">
          <p>+</p>
        </div>
        <p>New Post</p>
      </div>
    </div>
  )
}

export default SidebarNav;