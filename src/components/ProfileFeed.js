import ProfileCard from "./ProfileCard";

function ProfileFeed ({ posts }) {
  return (
    <div className="profile-feed">
      {posts &&
        posts.map(e => <ProfileCard key={e.postID} post={e} />)
      }
    </div>
  )
}

export default ProfileFeed;