import { Link } from "react-router-dom";
import CardComment from "./CardComment";

function CardComments({ postID, comments }) {
  return (
    <div className="card-cmts">
      <Link to={'/post/' + postID}>
        <p className="cmt-tag">View All Comments</p>
      </Link>
      <div className="cmts-container">
        {comments && 
          comments.map(e => <CardComment uid={e.uid} text={e.text} />)
        }
      </div>
    </div>
  )
}

export default CardComments;