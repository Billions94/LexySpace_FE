import { postTimer } from "../../../../../lib/index.js";
import { useEffect, useState } from "react"
import "./styles.scss";

const SingleReply = ({ commentID, comments, blog }) => {
  console.log("comment id", commentID);

  const url = process.env.REACT_APP_GET_URL

  const [replies, setReplies] = useState()

  const getReplies = async () => {
    try {
      const response = await fetch(`${url}/replies`)
      if(response.ok) {
        const data = await response.json()
        console.log('reply info', data)
        setReplies(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getReplies()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="replyContainer">
    { comments.postId !== blog._id
        ? null
        : replies && replies.map((reply) => (
            <>
        {reply.commentId === commentID ? (
          <div className="rply mb-2">
            <div className="text-dark mb-0" style={{ fontSize: "12px", borderBottom: "1px solid rgb(216, 215, 215)",}}>
              Posted: {postTimer(reply.createdAt)}
            </div>
            <div style={{ fontSize: "15px" }} className="d-flex  mb-0">
              {reply.id}
            </div>
            <div style={{ fontSize: "15px", width: "100%"}}
              className="d-flex rply  mb-1">
              {reply.text}
            </div>
          </div>
        ) : null}
      </>
    ))}
   </div>
  );
};

export default SingleReply;
