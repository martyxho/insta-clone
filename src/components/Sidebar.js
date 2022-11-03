import { signIn, signOutUser } from "../firebase";

function Sidebar ({ openUpload, openSignUp }) {
  return (
    <div className="home-sidebar">
      <div id="login-btns">
        <button onClick={openSignUp}>Sign Up</button>
        <button onClick={signIn}>Login</button>
      </div>
      <div id="user-info" hidden>
        <div id="user-container">
          <div id="user-pic" ></div>
          <div id="user-name"></div>
        </div>
        <button onClick={openUpload}>New Post</button>
        <button onClick={signOutUser}>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar;