import React, { useState, useEffect } from "react";
import { getUserProfile } from "../firebase";
import FollowUser from "./FollowUser";

function FollowInfo({ cUser, close, tab1, refresh, userID}) {
  const [tab, setTab] = useState(tab1);
  const [user, setUser] = useState();

  useEffect(() => {
    async function setState() {
      setUser(await getUserProfile(userID));
    }
    if (userID) {
      setState();
    } else {
      setUser(cUser);
    }
  },[cUser, userID]);

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
        {user && 
          <div className="follow-container">
            {tab &&
              user.following.map(e => <FollowUser cUser={cUser} uid={e} refresh={refresh}/>)
            }
            {!tab &&
              user.followers.map(e => <FollowUser cUser={cUser} uid={e} refresh={refresh}/>)
            }
          </div>
        }
      </div>
    </div>
  )
}

export default FollowInfo;