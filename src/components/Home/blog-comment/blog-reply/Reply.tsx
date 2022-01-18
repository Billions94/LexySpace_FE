import { Dispatch, SetStateAction } from "react";
import { Comments, Posts } from "../../../../redux/interfaces";
import SingleReply from "./SingleReply"

interface ReplyProps {
  blog: Posts | undefined
  comments: Comments[]
  commentID?: string
  replyComment: (c: Comments) => Promise<void>
  reply: {
    text: string
    user: string
  }
  setReply: Dispatch<SetStateAction<{
    text: string;
    user: string;
}>>
}

const Reply = ({ blog, comments, commentID, replyComment, reply, setReply }: ReplyProps) => {
  return (
    <>
      {
        <div id='replyContainer' className="d-flex" style={{ fontSize: "10px", marginTop: "5px" }}>
          {comments && comments.map((c, i) => ( 
          <SingleReply key={i} commentID={c._id} comment={c} 
            replyComment={replyComment} reply={reply}
            setReply={setReply} blog={blog} />
          ))}
        </div>
      }
    </>
  );
};

export default Reply;
