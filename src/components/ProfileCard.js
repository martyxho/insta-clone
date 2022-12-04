function ProfileCard ({ post }) {
  const { imageUrl, postID } = post;
  return (
    <div className="profile-card">
      <img className="profile-card-img" alt="post img" src={imageUrl}/>
    </div>
  )
}

export default ProfileCard;