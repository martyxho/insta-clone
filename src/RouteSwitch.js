import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Home from "./Home";

function RouteSwitch ({ posts, refresh}) {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home posts={posts} refresh={refresh} />} />
        {posts && 
          posts.map(e => {
            const path = `/post/${e.postID}`;
            return <Route path={path} element= {<Post post={e} refresh={refresh} />}/>
          })
        }
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;