import React, { useState } from "react";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import PostForm from "./components/PostForm";
import FollowInfo from "./components/FollowInfo";

function Home({ user, posts, refresh }) {

  const [upload, setUpload] = useState(false);
  const [followInfo, setFollowInfo] = useState(false);

  function openUploadForm () {
    setUpload(true);
  }

  function closeUploadForm () {
    setUpload(false);
  }

  function openFollow (tab1) {
    setFollowInfo({tab1: tab1});
  }

  function closeFollow () {
    setFollowInfo(false);
  }

  return (
    <div className="home">
      {upload &&
        <PostForm close={closeUploadForm} refresh={refresh}/>
      }
      {followInfo &&
        <FollowInfo user={user} close={closeFollow} tab1={followInfo.tab1} refresh={refresh}/>
      }
      <div className="home-main">
        <div className="home-inner">
          <div className="home-feed">
            { posts &&
              posts.map(e => <Card post={e} refresh={refresh} cUser={user} /> )
            }
          </div>
          <Sidebar openUpload={openUploadForm} user={user} openFollow={openFollow}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
