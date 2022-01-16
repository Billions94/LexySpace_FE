import { Comments, Posts } from "../../../../redux/interfaces";
import SingleReply from "./SingleReply"

interface ReplyProps {
  blog: Posts | undefined
  comments: Comments[]
  commentID?: string
}

const Reply = ({ blog, comments }: ReplyProps) => {
  return (
    <>
      {
        <div id='replyContainer' className="d-flex" style={{ fontSize: "10px", marginTop: "5px" }}>
          {comments && comments.map((c, i) => ( 
          <SingleReply key={i} commentID={c._id} comment={c} blog={blog} />
          ))}
        </div>
      }
    </>
  );
};

export default Reply;
