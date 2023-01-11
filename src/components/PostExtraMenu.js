import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../firebase";

function PostExtraMenu ({ postID, uid, close, cUser }) {

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('click', close);

    return () => window.removeEventListener('click', close);
  });

  async function handleDelete() {
    close();
    await deletePost(postID, uid);
    navigate('/profile/' + uid);
  }

  function click() {
    console.log('click');
    close();
  }

  return (
    <div>
      <div className="postExtraMenu">
        <button onClick={click} >Copy Link</button>
        {cUser && cUser.uid === uid && 
          <button onClick={handleDelete}>Delete</button>
        }
      </div>
    </div>
  )
}

export default PostExtraMenu;