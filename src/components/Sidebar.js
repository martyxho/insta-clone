import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { signIn, signOutUser, callAuthStateObserver, getCurrentUser } from "../firebase";

function Sidebar ({ openUpload, openSignUp }) {

  const [uid, setUID] = useState('');

  useEffect(() => {
    async function refreshUser() {
      await callAuthStateObserver();
      setUID(await getCurrentUser().uid);
    }
    refreshUser();
  }, []);

  return (
    <div className="home-sidebar">
      <div id="login-btns">
        <button onClick={openSignUp}>Sign Up</button>
        <button onClick={signIn}>Login</button>
      </div>
      <div id="user-info" hidden>
        <Link to={'/profile/' + uid} >
          <div id="user-container">
            <img id="user-pic" alt='user-pic' referrerPolicy="no-referrer"/>
            <div id="user-name"></div>
          </div>
        </Link>
        <button onClick={openUpload}>New Post</button>
        <button onClick={signOutUser}>Log Out</button>
      </div>
    </div>
  )
}

export default Sidebar;