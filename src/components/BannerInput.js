import { updateProfileBanner } from "../firebase";

function BannerInput({ user, refresh }) {

  async function handleBanner(e) {
    const bannerImg = e.target.files[0];
    if (bannerImg) {
      await updateProfileBanner(user, bannerImg);
      refresh();
    }
  }

  return (
    <label className="settings-bannerOverlayContainer">
      <input className="settings-fileInput" type="file" accept="image/jpeg, image/png, image/jpg" onInput={handleBanner}/>
      <div className="settings-bannerContainer">
        <div className="settings-banner">
          <img className="settings-bannerImg" alt="banner" src={user.bannerURL}/>
        </div>
      </div>
      <div className="settings-bannerOverlay">
        <svg className="settings-bannerIcon" stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="44" d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zm54.45-54.44l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z"></path></svg>
      </div>
    </label>
  )
}

export default BannerInput;