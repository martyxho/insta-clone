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
          <div className="follow-tabs">
            <div onClick={followingClick} className={tab ? 'nav-div active-header' : 'nav-div'} id="following">
              <h3>Following</h3>
            </div>
            <div onClick={followersClick} className={!tab ? 'nav-div active-header' : 'nav-div'} id="followers">
              <h3>Followers</h3>
            </div>
          </div>
          <svg onClick={close} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="follow-close" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144m224 0L144 368"></path></svg>
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