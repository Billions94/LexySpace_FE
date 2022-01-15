import React from "react";
import SingleReply from "./SingleReply.jsx";

const Reply = ({ blog, comments }) => {

  // console.log('i am the blog from reply', blog)
  // console.log('its me the good ol comment',comments)
  return (
    <>
      {
        <div id='replyContainer' className="d-flex" style={{ fontSize: "10px", marginTop: "5px" }}>
          {comments && comments.map((c, i) => ( 
          <SingleReply key={i} commentID={c._id} comments={c} blog={blog} />
          ))}
        </div>
      }
    </>
  );
};

export default Reply;
