import { ref } from "firebase/storage";
import React, { useState, useEffect } from "react";
import { updateProfile, getCurrentUserProfile } from "../firebase";
import BannerInput from "./BannerInput";
import ProfileInput from "./ProfileInput";

function EditProfile({ user, refresh }) {

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
      <div className="editProfile-container">
        <h3>Profile</h3>
        <form>
          <div className="editProfile-inner">
            <div>
              <BannerInput user={user} refresh={refresh} />
              <ProfileInput user={user} refresh={refresh} />
            </div>
            <div className="settings-textInputs">
              <div className="settings-name">
                <label>
                  <p>Display Name:</p>
                  <input id='name' type='text' value={name} onChange={handleName} />
                </label>
              </div>
              <div className="settings-bio">
                <label>
                  <p>Bio:</p>
                  <textarea id="bio" value={bio} onChange={handleBio}/>
                </label>
              </div>
            </div>
          </div>
          <div className="settings-btns">
            <button onClick={handleSubmit}>Save</button>
            <button>View Profile</button>
          </div>
        </form>
      </div>
    }  
      
    </div>
  )
}

export default EditProfile;