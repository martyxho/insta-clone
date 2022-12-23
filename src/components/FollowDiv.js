function FollowDiv() {
  function handleNavClick(e) {
    if (e.target.id === 'following') {
    }
  }

  return (
    <div className="follow-overlay">
      <div className="follow-div">
        <div className="follow-header">
          <nav className="follow-nav">
            <div className="nav-div" id="following">
              <button>Following</button>
            </div>
            <div className="nav-div" id="followers">
              <button>Followers</button>
            </div>
            <button className="follow-close">X</button>
          </nav>
        </div>
        <div className="follow-container">
        </div>
      </div>
    </div>
  )
}

export default FollowDiv;