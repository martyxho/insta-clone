function Card ({ userPicUrl, username, imageUrl, caption }) {

  return (
    <div className="card">
      <div className="card-header">
        <img src={userPicUrl} className='user-pic' alt="user-pic" />
        <div className="user-name">
          {username}
        </div>
      </div>
      <img src={imageUrl} className="main-img" alt="pic"/>
      <div className="card-footer">
        <div className="caption">
          {caption}
        </div>
        <div className="card-btns">
          <button>btn</button>
          <button>btn</button>
          <button>btn</button>
        </div>
        <div className="card-likes">
          x likes
        </div>
        <div className="card-commments">
          comments
        </div>
      </div>
    </div>
  )
}

export default Card;