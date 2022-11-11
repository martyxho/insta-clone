import React, { useState, useEffect } from "react";
import { getComments } from "../firebase";
import CommentSmall from "./CommentSmall";
import CommentForm from "./CommentForm";

function CardComments({ postID, refresh }) {
  const [comments, setComments] = useState('');

  useEffect(() => {
    setData();
  }, [postID]);

  async function setData() {
    const x = await getComments(postID);
    setComments(x);
  }

  return (
    <div className="cmts-container">
      <p>View All Comments</p>
      <div className="cmts">
        {comments && 
          comments.map(e => <CommentSmall uid={e.uid} text={e.text} />)
        }
      </div>
      <CommentForm postID={postID} refresh={refresh} setData={setData}/>
    </div>
  )
}

export default CardComments;