import { postTimer } from "../../../../lib/index"
import { Comments, Posts, Replies, ReduxState } from "../../../../redux/interfaces"
import { Image } from "react-bootstrap"
import { useSelector } from "react-redux"
import "./styles.scss"

interface SingleReplyProps {
  commentID: string | undefined
  comment: Comments
  reply: Replies
  blog: Posts | undefined
  getReplies: () => Promise<void>
}

const SingleReply = ({ commentID, comment, reply, blog, getReplies}: SingleReplyProps) => {

  console.log('comment id', commentID)

  const url = process.env.REACT_APP_GET_URL
  const { user } = useSelector((state: ReduxState) => state.data)
  const me = user!._id


  const deleteReply = async (id: string) => {
    try {
      const response = await fetch(`${url}/replies/${id}`, {
        method: 'DELETE'
      })
      if(response.ok) {
        console.log('Reply deleted')
        getReplies()
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="replyContainer">
    { comment.postId !== blog?._id
        ? null : 
        <>
        { reply.commentId === commentID ? (
          <div className="d-flex">
            <div>
              <Image
                  className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                  src={reply.user.image}
                  alt="Image Description"
                />
            </div>
          <div className="rply mb-2">
            <div className="text-dark mb-0" style={{ fontSize: "12px", borderBottom: "1px solid rgb(216, 215, 215)",}}>
              {/* Posted: {postTimer(reply.createdAt)} */}

            </div>
            <div style={{ fontSize: "15px" }} className="d-flex  mb-0">
              {reply.user.firstName} {reply.user.lastName}
            </div>
            <div style={{ fontSize: "15px", width: "100%"}}
              className="d-flex rply  mb-1">
              {reply.text}
            </div>
            { reply.user._id !== me ? null : 
            <button onClick={() => deleteReply(reply._id)}>X</button>
            }
          </div>
          </div>
        ) : null}
      </>
    }
   </div>
  );
};

export default SingleReply;
