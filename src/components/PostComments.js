import CommentSmall from "./CommentSmall";

function PostComments ({ comments }) {
  return (
    <div className="post-comments">
      {comments &&
        comments.map(e => <CommentSmall uid={e.uid} text={e.text} />)
      }
    </div>
  )
}

export default PostComments;