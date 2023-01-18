import React, { useState } from "react";
import PostMenu from "./PostMenu";

function PostMenuOpen({ postID, uid, cUser }) {

  const [extra, setExtra] = useState(false);

  function openExtra(e) {
    e.stopPropagation();
    setExtra(true);
  }

  function closeExtra() {
    console.log('close');
    setExtra(false);
  }

  return (
    <div style={{position: 'relative'}}>
      {extra && 
        <PostMenu close={closeExtra} postID={postID} uid={uid} cUser={cUser} />
      }
      <svg className="post-open-icon" onClick={openExtra} focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path></svg>
    </div>
  )
}

export default PostMenuOpen;