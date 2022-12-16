import React, { useState } from "react";
import PostExtraMenu from "./PostExtraMenu";

function ExtraButton({ postID, uid }) {

  const [extra, setExtra] = useState(false);

  function openExtra() {
    setExtra(true);
  }

  function closeExtra() {
    console.log('close');
    setExtra(false);
  }

  return (
    <div className="extra-button">
      <button onClick={openExtra}>...</button>
      {extra && 
        <PostExtraMenu close={closeExtra} postID={postID} uid={uid}/>
      }
    </div>
  )
}

export default ExtraButton;