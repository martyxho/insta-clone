import React, { useState } from "react";
import FollowUser from "./FollowUser";

function FollowInfo({ user, close, tab1, refresh }) {
  const [tab, setTab] = useState(tab1);

  function followingClick() {
    setTab(true);
  }

  function followersClick() {
    setTab(false);
  }


  return (
    <div className="follow-overlay">
      <div className="follow-div">
        <div className="follow-header">
          <nav className="follow-nav">
            <div className={tab ? 'nav-div active-header' : 'nav-div'} id="following">
              <button onClick={followingClick}>Following</button>
            </div>
            <div className={!tab ? 'nav-div active-header' : 'nav-div'} id="followers">
              <button onClick={followersClick}>Followers</button>
            </div>
            <button className="follow-close" onClick={close}>X</button>
          </nav>
        </div>
        <div className="follow-container">
          {tab &&
            user.following.map(e => <FollowUser uid={e} refresh={refresh}/>)
          }
          {!tab &&
            user.followers.map(e => <FollowUser  uid={e} refresh={refresh}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default FollowInfo;