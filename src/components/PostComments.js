import PostComment from "./PostComment";

function PostComments ({ comments }) {
  return (
    <div className="post-comments">
      {comments &&
        comments.map(e => <PostComment key={e.cmtID} cmt={e} />)
      }
    </div>
  )
}

export default PostComments;