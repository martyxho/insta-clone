import PostComment from "./PostComment";

function PostComments ({ comments }) {
  return (
    <div className="post-comments">
      {comments &&
        comments.map(e => <PostComment cmt={e} />)
      }
    </div>
  )
}

export default PostComments;