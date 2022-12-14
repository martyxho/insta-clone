import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Home from "./Home";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function RouteSwitch ({ user, posts, refresh}) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={posts} refresh={refresh} user={user} />} />
        <Route path="/post/:postID" element={<Post />} />
        <Route path="/profile/:userID" element={<Profile cUser={user} refresh={refresh} />} />
        <Route path="/settings" element={<EditProfile user={user} refresh={refresh} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;