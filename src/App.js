import React, { useState, useEffect } from "react";
import { getPosts } from "./firebase";
import RouteSwitch from "./RouteSwitch";

function App () {

  const [refresh, setRefresh] = useState(false);
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

  return (
    <div className="app">
      <RouteSwitch posts={posts} refresh={toggleRefresh}/>
    </div>
  )
}

export default App;