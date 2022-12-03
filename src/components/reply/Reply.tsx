import { useEffect, useState } from "react";
import { Post } from "../../dto";
import { Comment, Replies } from "../../redux/interfaces";
import SingleReply from "./SingleReply";

interface ReplyProps {
  blog: Post | undefined;
  comment: Comment;
  commentID?: string;
}

const Reply = ({ blog, comment, commentID }: ReplyProps) => {
  const url = process.env.REACT_APP_GET_URL;
  const [replies, setReplies] = useState<Replies[]>();

  const getReplies = async () => {
    try {
      const response = await fetch(`${url}/replies`);
      if (response.ok) {
        const data: Replies[] = await response.json();
        console.log("reply info", data);
        setReplies(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReplies();
  }, [comment]);

  return (
    <>
      {
        <div
          id="replyContainer"
          className="d-flex"
          style={{ fontSize: "10px", marginTop: "5px" }}
        >
          {replies &&
            replies.map((reply, i) => (
              <SingleReply
                key={i}
                commentID={commentID}
                reply={reply}
                comment={comment}
                blog={blog}
                getReplies={getReplies}
              />
            ))}
        </div>
      }
    </>
  );
};

export default Reply;
