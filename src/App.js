import React, { useState, useEffect } from "react";
import { getPosts, getCurrentUserProfile } from "./firebase";
import RouteSwitch from "./RouteSwitch";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function App () {

  const [refresh, setRefresh] = useState(false);
  const [posts, setPosts] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), refreshUser);
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    async function setData() {
      const x = await getPosts();
      setPosts(x);
    }
    refreshUser(true);
    setData();
    console.log('refresh');
  }, [refresh]);

  async function refreshUser(user) {
    if (user) {
      const cUser = await getCurrentUserProfile();
      setUser(cUser);
    } else {
      setUser(false);
    }
  }

  function toggleRefresh() {
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  }

  return (
    <div className="app">
      <RouteSwitch posts={posts} refresh={toggleRefresh} user={user} />
    </div>
  )
}

export default App;