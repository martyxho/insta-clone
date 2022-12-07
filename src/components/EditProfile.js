import React, { useState, useEffect } from "react";
import { updateProfile, updateProfileBanner, updateProfilePic, getCurrentUserProfile } from "../firebase";

function EditProfile() {

  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    async function setData() {
      setUser(await getCurrentUserProfile());
    }
    if (user) {
      setName(user.name);
      setBio(user.bio);
    } else {
      setData();
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

    // get banner and profilePic files
    const bannerInput = document.getElementById('banner');
    const bannerImg = bannerInput.files[0];
    const profileInput = document.getElementById('profilePic');
    const profilePic = profileInput.files[0];

    //call update functions
    if (bannerImg) {
      updateProfileBanner(bannerImg);
    }

    if (profilePic) {
      updateProfilePic(profilePic);
    }

    updateProfile(name, bio);
  }

  return (
    <div className="settings">
      <div className="editProfile-container">
        <h3>Profile</h3>
        <form>
          <div className="editProfile-inner">
            <div>
              <div className="settings-bannerContainer">
                <label>
                  <p>Banner Image: </p>
                  <input id="banner" type="file" accept="image/jpeg, image/png, image/jpg" className="settings-bannerInput" />
                </label>
              </div>
              <div className="settings-profilePic">
              <label>
                <p>Profile Pic: </p>
                <input id="profilePic" type="file" accept="image/jpeg, image/png, image/jpg" className="settings-bannerInput" />
              </label>
              </div>
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
    </div>
  )
}

export default EditProfile;