import ProfileCard from "./ProfileCard";

function ProfileFeed ({ posts }) {
  return (
    <div className="profile-feed">
      {posts &&
        posts.map(e => <ProfileCard post={e} />)
      }
    </div>
  )
}

export default ProfileFeed;