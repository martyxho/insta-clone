import { updateProfileBanner } from "../firebase";

function BannerInput({ user, refresh }) {

  async function handleBanner(e) {
    const bannerImg = e.target.files[0];
    if (bannerImg) {
      await updateProfileBanner(bannerImg);
      refresh();
    }
  }
  function handleMouseEnterBanner() {
    const overlay = document.getElementById('settings-bannerOverlay');
    overlay.style.opacity = '0.2';
  }

  function handleMouseLeaveBanner() {
    const overlay = document.getElementById('settings-bannerOverlay');
    overlay.style.opacity = '0';
  }

  return (
    <div className="settings-banner">
      <label>
        <input id="bannerInput" type="file" accept="image/jpeg, image/png, image/jpg" className="settings-bannerInput" onInput={handleBanner} onMouseEnter={handleMouseEnterBanner} onMouseLeave={handleMouseLeaveBanner}/>
      </label>
      <img className="settings-bannerImg" alt="banner" src={user.bannerURL}/>
      <div id="settings-bannerOverlay"></div>
    </div>
  )
}

export default BannerInput;