import PostSidebar from "./PostSidebar";
import { useParams } from "react-router-dom";

function Post({posts, refresh}) {

  const { postID } = useParams();
  const [post] = posts.filter(e => e.postID === postID);
  
  return (
    <div className="post-main">
      <div className="post-container">
        <img src={post.imageUrl} alt="post-img" className="post-img"/>
        <PostSidebar post={post} refresh={refresh}/>
      </div>
    </div>
  )
}

export default Post;