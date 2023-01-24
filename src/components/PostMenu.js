import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost } from "../firebase";

function PostMenu ({ postID, uid, close, cUser }) {

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

  function copyLink() {
    const path = window.location.host + '/post/' + postID;
    navigator.clipboard.writeText(path);
  }

  return (
    <div className="post-menu-container">
      <div className="post-menu-inner">
        <div className="post-menu-option" onClick={copyLink}>
          <svg className="post-menu-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="128" cy="256" r="48" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="384" cy="112" r="48" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><circle cx="384" cy="400" r="48" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></circle><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M169.83 279.53l172.34 96.94m0-240.94l-172.34 96.94"></path></svg>
          <p>Copy Link</p>
        </div>
        {cUser && cUser.uid === uid && 
          <div className="post-menu-option" onClick={handleDelete}>
            <svg className="post-menu-icon" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"></path><path stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"></path><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40m-64 64v224m-72-224l8 224m136-224l-8 224"></path></svg>
            <p>Delete</p>
          </div>
        }
      </div>
    </div>
  )
}

export default PostMenu;