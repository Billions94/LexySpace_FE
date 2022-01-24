import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Comments, Posts, Replies } from "../../../../redux/interfaces";
import SingleReply from "./SingleReply"

interface ReplyProps {
  blog: Posts | undefined
  comment: Comments
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

const Reply = ({ blog, comment, commentID, replyComment, reply, setReply }: ReplyProps) => {

  const url = process.env.REACT_APP_GET_URL
  const [replies, setReplies] = useState<Replies[]>()

  const getReplies = async () => {
    try {
      const response = await fetch(`${url}/replies`)
      if(response.ok) {
        const data: Replies[] = await response.json()
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
    <>
      {
        <div id='replyContainer' className="d-flex" style={{ fontSize: "10px", marginTop: "5px" }}>
          {replies && replies.map((reply, i) => (
               <SingleReply key={i} 
                commentID={commentID} 
                reply={reply}
                comment={comment}
                blog={blog}
                getReplies={getReplies}/>
          ))}
        </div>
      }
    </>
  );
};

export default Reply;
