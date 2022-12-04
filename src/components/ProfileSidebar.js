function ProfileSidebar ({ user, postCount }) {
  return (
    <div className="profile-sidebar">
      <div>
        {user.name}
      </div>
      <div>
        {postCount} posts
      </div>
      <div>
        Bio
      </div>
    </div>
  )
}

export default ProfileSidebar;