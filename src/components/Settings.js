import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateProfile} from "../firebase";
import BannerInput from "./BannerInput";
import ProfileInput from "./ProfileInput";

function Settings({ user, refresh }) {

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
    }
  }, [user]);

  function handleName(e) {
    setName(e.target.value);
  }

  function handleBio(e) {
    setBio(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(name, bio);
  }

  return (
    
    <div className="settings">
    {user && 
      <div className="settings-container">
        <h3>Settings</h3>
        <div className="settings-inner">
          <div>
            <BannerInput user={user} refresh={refresh} />
            <form>
              <ProfileInput user={user} refresh={refresh} />
            </form>
          </div>
          <div className="settings-textInputs">
            <form className="settings-textForm">
              <div className="settings-inputContainer">
                <p>Display Name:</p>
                <div className="settings-input">
                  <input autoComplete="off" name="displayName" className="settings-inputBoxDisplay" maxLength={25} minLength={3} type='text' value={name} onChange={handleName} />
                </div>
              </div>
              <div className="settings-inputContainer">
                <p>Bio:</p>
                <textarea className="settings-bioInput" name='bio' maxLength={150} placeholder={'Hi my name is ' + name} value={bio} onChange={handleBio}/>
              </div>
            </form>
          </div>
        </div>
        <div className="settings-btnContainer">
          <button className="settings-submitBtn" onClick={handleSubmit}>Save</button>
          <Link className="settings-profileLink" to={'/profile/' + user.uid}>
            <button className="settings-profileBtn">View Profile</button>
          </Link>
        </div>
      </div>
    }  
      
    </div>
  )
}

export default Settings;