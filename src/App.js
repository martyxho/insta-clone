import React, { useState, useEffect } from "react";
import { getPosts } from "./firebase";
import Nav from "./components/Nav";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import PostForm from "./components/PostForm";

function App() {

  const [upload, setUpload] = useState(false);
  const [posts, setPosts] = useState(false);

  useEffect(() => {
    async function setData() {
      const x = await getPosts();
      setPosts(x);
    }
    setData();
  }, []);

  function openUploadForm () {
    setUpload(true);
  }

  function closeUploadForm () {
    setUpload(false);
  }



  return (
    <div className="App">
      <Nav />
      {upload &&
        <PostForm close={closeUploadForm}/>
      }
      <div className="home">
        <div className="home-inner">
          <div className="home-feed">
            { posts &&
              posts.map(e => <Card userPicUrl={e.profilePicUrl} username={e.name} imageUrl={e.imageUrl} caption={e.text}/> )
            }
          </div>
          <Sidebar openUpload={openUploadForm} />
        </div>
        
      </div>
    </div>
  );
}

export default App;
