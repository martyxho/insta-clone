import React, { useState, useEffect } from "react";
import { getPosts, getCurrentUserProfile, getUserFeed } from "./firebase";
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
    setState();
    console.log('mounted');
  }, [user]);

  async function setState() {
    if (user) {
      setPosts(await getUserFeed(user.uid));
    } else {
      setPosts(await getPosts());
    }
  }

  async function refreshUser(user) {
    if (user) {
      const cUser = await getCurrentUserProfile();
      setUser(cUser);
    } else {
      setUser(false);
    }
  }

  function toggleRefresh() {
    console.log('refresh');
    if (refresh) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  }

  return (
    <div className="app">
      <RouteSwitch posts={posts} refresh={setState} user={user} />
    </div>
  )
}

export default App;