import React, { useState, useEffect } from "react";
import { getUserFollows, getUserFollowers } from "../firebase";
import FollowUser from "./FollowUser";

function FollowInfo({ user, close, tab1, refresh }) {
  const [tab, setTab] = useState(tab1);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    async function setState() {
      setFollowing(await getUserFollows(user.uid));
      setFollowers(await getUserFollowers(user.uid));
    }
    setState();
  }, [user]);

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
            <div className={tab ? 'nav-div active' : 'nav-div'} id="following">
              <button onClick={followingClick}>Following</button>
            </div>
            <div className={!tab ? 'nav-div active' : 'nav-div'} id="followers">
              <button onClick={followersClick}>Followers</button>
            </div>
            <button className="follow-close" onClick={close}>X</button>
          </nav>
        </div>
        <div className="follow-container">
          {tab &&
            following.map(e => <FollowUser uid={e.uid} refresh={refresh}/>)
          }
          {!tab &&
            followers.map(e => <FollowUser  uid={e.uid} refresh={refresh}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default FollowInfo;