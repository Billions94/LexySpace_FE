import { postTimer } from "../../../../lib/index"
import { useEffect, useState, Dispatch, SetStateAction } from "react"
import { Comments, Posts, Replies } from "../../../../redux/interfaces"
import { Image, Dropdown } from "react-bootstrap"
import "./styles.scss"

interface SingleReplyProps {
  commentID: string | undefined
  comment: Comments
  blog: Posts | undefined
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

const SingleReply = ({ commentID, comment, blog, replyComment, reply, setReply }: SingleReplyProps) => {
  console.log("comment id", commentID);

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

  useEffect(() => {
    getReplies()
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="replyContainer">
    { comment.postId !== blog?._id
        ? null
        : replies && replies.map((reply) => (
            <>
        {reply.commentId === commentID ? (
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
              {/* <Dropdown className="dropdowntext ml-auto">
                <Dropdown.Toggle
                  className="btn btn-dark dropdownbtn">
                  <img alt=''
                    className="lrdimg"
                    width="15px"
                    src="https://img.icons8.com/carbon-copy/50/000000/menu-2.png"/>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className='dropDownMenu'
                  style={{padding: "18px", borderRadius: "25px", border: "1px solid rgb(216, 215, 215)"}}>
                  <br />
                  <div>
                  <Dropdown className="dropdowntext mb-1">
                  <Dropdown.Toggle className="btn btn-dark reply">
                    <img alt=''
                      className="lrdimg"
                      width="17px"
                      src="https://img.icons8.com/carbon-copy/50/000000/reply-arrow.png"
                    />
                  </Dropdown.Toggle>
                    <Dropdown.Menu
                      style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        borderRadius: "25px",
                        border: "1px solid rgb(216, 215, 215)"}}>
                      <textarea className="mt-0 textAr"
                        // value={reply.text}
                        // onChange={(e) =>
                        //   setReply({ ...reply, text: e.target.value })
                        // }
                        placeholder="write a reply..."/>
                      <br />
                      <button style={{ borderRadius: "50px" }}
                        className="btn btn-dark"
                        onClick={(e) => replyComment(comment)}>
                        send
                      </button>
                    </Dropdown.Menu>
                  </Dropdown>
                  </div>
                          
                  <div className="d-flex customLinks">
                    <div  className="mr-3">
                      <img alt='' className="lrdimg" width="17px"
                        src="https://img.icons8.com/fluency/50/000000/delete-sign.png"/>
                    </div>
                    <div onClick={() => deleteReply(reply._id)}>
                      delete Comment
                    </div> 
                  </div>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
            <div style={{ fontSize: "15px" }} className="d-flex  mb-0">
              {reply.user.firstName} {reply.user.lastName}
            </div>
            <div style={{ fontSize: "15px", width: "100%"}}
              className="d-flex rply  mb-1">
              {reply.text}
            </div>
            <button onClick={() => deleteReply(reply._id)}>X</button>
          </div>
          </div>
        ) : null}
      </>
    ))}
   </div>
  );
};

export default SingleReply;
