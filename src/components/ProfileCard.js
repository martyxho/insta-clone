import { Link } from "react-router-dom";

function ProfileCard ({ post }) {
  const { imageUrl, postID } = post;
  return (
    <div className="profile-card">
      <Link to={'/post/' + postID}>
        <img className="profile-card-img" alt="post img" src={imageUrl}/>
      </Link>
    </div>
  )
}

export default ProfileCard;