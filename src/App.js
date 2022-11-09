import React, { useState, useEffect } from "react";
import uniqid from 'uniqid';
import { getPosts } from "./firebase";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import PostForm from "./components/PostForm";
import SignUpForm from "./components/SignUpForm";

function App() {

  const [refresh, setRefresh] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [upload, setUpload] = useState(false);
  const [posts, setPosts] = useState(false);

  useEffect(() => {
    async function setData() {
      const x = await getPosts();
      setPosts(x);
    }
    setData();
    console.log('refresh');
  }, [refresh]);

  function toggleRefresh() {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  }

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
    <div className="App">
      <Nav />
      {upload &&
        <PostForm close={closeUploadForm} refresh={toggleRefresh}/>
      }
      {signUp &&
        <SignUpForm />
      }
      <div className="home">
        <div className="home-inner">
          <div className="home-feed">
            { posts &&
              posts.map(e => <Card postID={e.postID} userPicUrl={e.profilePicUrl} uid={e.uid} imageUrl={e.imageUrl} caption={e.text} likes={e.likes} refresh={toggleRefresh}/> )
            }
          </div>
          <Sidebar openUpload={openUploadForm} openSignUp={openSignUpForm} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
