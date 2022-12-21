import React, { useState, useEffect } from "react";
import { getPosts, getCurrentUserProfile, getUserFeed } from "./firebase";
import RouteSwitch from "./RouteSwitch";
import { onAuthStateChanged, getAuth } from "firebase/auth";

function App () {

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

  function refresh() {
    refreshUser(true);
  }

  return (
    <div className="app">
      <RouteSwitch posts={posts} refresh={refresh} user={user} />
    </div>
  )
}

export default App;