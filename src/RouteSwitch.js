import { HashRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Home from "./Home";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import SignUp from "./components/SignUp";

function RouteSwitch ({ user, posts, refresh}) {
  return (
    <HashRouter>
      <Nav user={user}/>
      <Routes>
        <Route path="/" element={<Home posts={posts} refresh={refresh} user={user} />} />
        <Route path="/post/:postID" element={<Post cUser={user} />} />
        <Route path="/profile/:userID" element={<Profile cUser={user} refresh={refresh} />} />
        <Route path="/settings" element={<Settings user={user} refresh={refresh} />} />
        <Route path="/sign-up" element={<SignUp refresh={refresh}/>} />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;