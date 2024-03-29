import { updateProfilePic } from "../firebase";

function ProfileInput({ user, refresh }) {

  async function handleInput(e) {
    const img = e.target.files[0];
    if (img) {
      await updateProfilePic(user, img);
      refresh();
    }
  }

  return (
    <div className="settings-containerBar">
      <label className="settings-profileOverlayContainer">
      <input className='settings-fileInput' type="file" accept="image/jpeg, image/png, image/jpg" onInput={handleInput} />
      <div className="settings-profileInputContainer">
        <img className="settings-profileImg" alt="profile" src={user.profilePicUrl} />
      </div>
      <div id="settings-profileOverlay">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="settings-profileIcon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M416 64H96a64.07 64.07 0 00-64 64v256a64.07 64.07 0 0064 64h320a64.07 64.07 0 0064-64V128a64.07 64.07 0 00-64-64zm-80 64a48 48 0 11-48 48 48.05 48.05 0 0148-48zM96 416a32 32 0 01-32-32v-67.63l94.84-84.3a48.06 48.06 0 0165.8 1.9l64.95 64.81L172.37 416zm352-32a32 32 0 01-32 32H217.63l121.42-121.42a47.72 47.72 0 0161.64-.16L448 333.84z"></path></svg>
      </div>
      </label>
    </div>
  )
}

export default ProfileInput;