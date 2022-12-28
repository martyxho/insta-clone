import React, { useState } from "react";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import PostForm from "./components/PostForm";
import SignUpForm from "./components/SignUpForm";
import FollowInfo from "./components/FollowInfo";

function Home({ user, posts, refresh }) {

  const [signUp, setSignUp] = useState(false);
  const [upload, setUpload] = useState(false);
  const [followInfo, setFollowInfo] = useState(false);

  function openUploadForm () {
    setUpload(true);
  }

  function closeUploadForm () {
    setUpload(false);
  }

  function openSignUpForm () {
    setSignUp(true);
  }

  function closeSignUpForm () {
    setSignUp(false);
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
      {signUp &&
        <SignUpForm close={closeSignUpForm} refresh={refresh}/>
      }
      {followInfo &&
        <FollowInfo user={user} close={closeFollow} tab1={followInfo.tab1} refresh={refresh}/>
      }
      <div className="home-main">
        <div className="home-inner">
          <div className="home-feed">
            { posts &&
              posts.map(e => <Card post={e} refresh={refresh} cUser={user} openSignUp={openSignUpForm}/> )
            }
          </div>
          <Sidebar openUpload={openUploadForm} openSignUp={openSignUpForm} user={user} openFollow={openFollow}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
