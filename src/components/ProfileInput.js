import { updateProfilePic } from "../firebase";

function ProfileInput({ user, refresh }) {

  async function handleInput(e) {
    const img = e.target.files[0];
    if (img) {
      await updateProfilePic(img);
      refresh();
    }
  }

  function handleMouseEnter() {
    const overlay = document.getElementById('settings-profileOverlay');
    overlay.style.opacity = '0.2';
  }

  function handleMouseLeave() {
    const overlay = document.getElementById('settings-profileOverlay');
    overlay.style.opacity = '0';
  }

  return (
    <div className="settings-profilePic">
      <div className="settings-profileInputContainer">
        <label>
          <input id="profilePicInput" type="file" accept="image/jpeg, image/png, image/jpg" className="settings-bannerInput" onInput={handleInput} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
        </label>
        <img className="settings-profileImg" alt="profile" src={user.profilePicUrl} />
      <div id="settings-profileOverlay"></div>
      </div>
    </div>
  )
}

export default ProfileInput;