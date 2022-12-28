import { Link } from "react-router-dom";
import { handleLogin } from "../firebase";
import SidebarNav from "./SidebarNav";

function Sidebar ({ openUpload, openSignUp, openFollow, user }) {

  return (
    <div className="home-sidebar">
      {!user &&
        <div id="login-btns">
          <button onClick={openSignUp}>Sign Up</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      }
      {user && 
        <div className="user-info">
          <Link to={'/profile/' + user.uid} >
            <div id="user-container">
              <img id="user-pic" alt='user-pic' referrerPolicy="no-referrer" src={user.profilePicUrl}/>
              <div id="user-name">{user.name}</div>
            </div>
          </Link>
          <SidebarNav user={user} openUpload={openUpload} openFollow={openFollow}/>
        </div>
      }
    </div>
  )
}

export default Sidebar;