import { useNavigate } from "react-router-dom";
import { deletePost } from "../firebase";

function PostExtraMenu ({ postID, uid, close }) {

  const navigate = useNavigate();

  async function handleDelete() {
    await deletePost(postID, uid);
    navigate('/profile/' + uid);
  }

  return (
    <div>
      <div className="postExtraMenu">
        <button>Copy Link</button>
        <button onClick={handleDelete} >Delete</button>
      </div>
      <div className="postExtraOverlay" onClick={close}>
      </div>
    </div>
  )
}

export default PostExtraMenu;