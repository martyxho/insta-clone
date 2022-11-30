import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Home from "./Home";
import Profile from "./components/Profile";

function RouteSwitch ({ posts, refresh}) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={posts} refresh={refresh} />} />
        <Route path="/post/:postID" element={<Post posts={posts} refresh={refresh} />} />
        <Route path="/profile/:userID" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;