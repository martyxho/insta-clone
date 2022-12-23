import React, { useState } from "react";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import PostForm from "./components/PostForm";
import SignUpForm from "./components/SignUpForm";

function Home({ user, posts, refresh }) {

  const [signUp, setSignUp] = useState(false);
  const [upload, setUpload] = useState(false);

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

  return (
    <div className="home">
      {upload &&
        <PostForm close={closeUploadForm} refresh={refresh}/>
      }
      {signUp &&
        <SignUpForm close={closeSignUpForm} refresh={refresh}/>
      }
      <div className="home-main">
        <div className="home-inner">
          <div className="home-feed">
            { posts &&
              posts.map(e => <Card post={e} refresh={refresh} cUser={user} openSignUp={openSignUpForm}/> )
            }
          </div>
          <Sidebar openUpload={openUploadForm} openSignUp={openSignUpForm} user={user} />
        </div>
      </div>
    </div>
  );
}

export default Home;
