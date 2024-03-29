import { Link } from "react-router-dom";
import CardComment from "./CardComment";

function CardComments({ postID, comments }) {
  return (
    <div className="card-cmts">
      <Link to={'/post/' + postID}>
        {comments.length > 0 &&
          <p className="cmt-tag">View All Comments</p>
        }
        {comments.length < 1 &&
          <p className="cmt-tag">No Comments</p>
        }
      </Link>
      <div className="cmts-container">
        {comments && 
          comments.map(e => <CardComment key={e.cmtID} uid={e.uid} text={e.text} />)
        }
      </div>
    </div>
  )
}

export default CardComments;