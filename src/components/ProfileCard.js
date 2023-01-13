import { Link } from "react-router-dom";

function ProfileCard ({ post }) {
  const { imageUrl, postID } = post;
  return (
    <div className="profile-card">
      <Link to={'/post/' + postID}>
        <div className="profile-card-overlay">
        </div>
        <img className="profile-card-img" alt="post img" src={imageUrl}/>
      </Link>
      <img className="profile-card-blur" alt="post img" src={imageUrl}/>
    </div>
  )
}

export default ProfileCard;