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
      <div className="navBox" onClick={followingClick}>
        <div className="user-stat">
          <p>{user.following.length}</p> 
        </div>
        <p>Following</p>
      </div>
      <div className="navBox" onClick={followersClick}>
        <div className="user-stat">
          <p>{user.followers.length}</p>
        </div>
        <p>Followers</p>
      </div>
      <Link to={'/profile/' + user.uid}>
        <div className="navBox">
          <div className="user-stat">
            <p>{user.posts.length}</p>
          </div>
          <p>Posts</p>
        </div>
      </Link>
      <div className="navBox" onClick={openUpload}>
        <div className="user-stat">
          <p className="plus-icon">+</p>
        </div>
        <p>New Post</p>
      </div>
    </div>
  )
}

export default SidebarNav;