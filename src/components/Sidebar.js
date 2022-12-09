import { Link } from "react-router-dom";
import { signIn, signOutUser } from "../firebase";

function Sidebar ({ openUpload, openSignUp, user }) {

  return (
    <div className="home-sidebar">
      {!user &&
        <div id="login-btns">
          <button onClick={openSignUp}>Sign Up</button>
          <button onClick={signIn}>Login</button>
        </div>
      }
      {user && 
        <div id="user-info">
          <Link to={'/profile/' + user.uid} >
            <div id="user-container">
              <img id="user-pic" alt='user-pic' referrerPolicy="no-referrer" src={user.profilePicUrl}/>
              <div id="user-name">{user.name}</div>
            </div>
          </Link>
          <button onClick={openUpload}>New Post</button>
          <button onClick={signOutUser}>Log Out</button>
        </div>
      }
    </div>
  )
}

export default Sidebar;