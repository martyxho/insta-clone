import PostSidebar from "./PostSidebar";

function Post({post, refresh}) {
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