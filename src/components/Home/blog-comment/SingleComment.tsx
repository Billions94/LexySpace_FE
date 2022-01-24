import { Dropdown, Image } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Link } from "react-router-dom"
import { postTimer } from "../../../lib"
import { Comments, Posts, ReduxState, Replies } from "../../../redux/interfaces"
import Reply from "./blog-reply/Reply"

interface SingleCommentProps {
    id: string | undefined
    blog: Posts
    comment: Comments
    comments: Comments[]
    fetchComments: () => Promise<void>
}

const SingleComment = ({ id, blog, comment, comments, fetchComments }: SingleCommentProps) => {

    const apiUrl = process.env.REACT_APP_GET_URL
    const dispatch = useDispatch()
    const { user } = useSelector((state: ReduxState) => state.data)
  
    const [reply, setReply] = useState({
      text: "",
      user: user!._id
    })
    const [show, setShow] = useState(false)
    const [replies, setReplies] = useState<Replies[]>()
  
    const toggle = () => {
      show === false ? setShow(true) : setShow(false)
    }

    const replyComment = async (c: Comments) => {
        try {
          const response = await fetch(`${apiUrl}/replies/${c._id}`, {
            method: "POST",
            body: JSON.stringify(reply),
            headers: { "Content-Type": "application/json" },
          })
          if (response.ok) {
            setReply({
              text: "",
              user: user!._id
            })
            getReplies()
            fetchComments()
          }
        } catch (error) {
          console.log("ooops we encountered an error", error)
        }
      }

      const getReplies = async () => {
        try {
          const response = await fetch(`${apiUrl}/replies`)
          if(response.ok) {
            const data: Replies[] = await response.json()
            console.log('reply info', data)
            setReplies(data)
          }
        } catch (error) {
          console.log(error)
        }
      }
    
      const deleteComment = async (c: Comments) => {
        try {
          const response = await fetch(`${apiUrl}/posts/${id}/comments/${c._id}`,
            { method: "DELETE" }
          )
          if (response.ok) {
            fetchComments()
          }
        } catch (error) {
          console.log("ooops we encountered an error", error)
        }
      }

    return(
        <div key={comment._id}>
        <div className="cardHeader">
          <div className="d-flex col-12">
            <Link to={`/userProfile/${user._id}`}>
              <div>
                <Image
                  className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                  src={comment.user.image}
                  alt="Image Description"
                />
              </div>
            </Link>
            <div className="cAndR position-relative">
              <div className="d-flex customBB">
                <div className="text-muted posted mb-2">
                  Posted: {postTimer(comment.createdAt)}
                </div>
                <Dropdown className="dropdowntext ml-auto">
                  <Dropdown.Toggle
                    className="btn btn-dark dropdownbtn">
                    <img alt=''
                      className="lrdimg"
                      width="15px"
                      src="https://img.icons8.com/android/50/000000/more.png" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className='dropDownMenu'
                    style={{ padding: "18px", borderRadius: "25px", border: "1px solid rgb(216, 215, 215)" }}>

                    {/* <Edit /> */}
                    <div className="d-flex customLinks">
                      <div className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png" />
                      </div>
                      <div onClick={(e) => deleteComment(comment)}>
                        delete
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className="text-dark mb-2 userInfo">
                {comment.user.firstName} {comment.user.lastName}
              </div>
              <div className="commentText mb-2">
                {comment.text}
              </div>
              <span onClick={() => toggle()}
                className="replyspan">
                Reply
              </span>
            </div>
          </div>
          { show === false ? null :
            <div className='reply'>
            <Link to={`/userProfile/${user._id}`}>
              <div>
                <Image roundedCircle src={user.image} alt=''
                  width={37} height={37} />
              </div>
            </Link>
              <div className="p-2 w-100">
                <textarea className='form-control replyarea'
                  rows={1}
                  value={reply.text}
                  onChange={(e) => setReply({ ...reply, text: e.target.value })} />
                <div className="mt-2 d-flex">
                  {!reply.text ? null :
                    <button className="btn btn-sm modal-btn ml-auto"
                      onClick={() => replyComment(comment)}>
                      <i className="fa fa-pencil fa-fw" /> Reply
                    </button>
                  }
                </div>
              </div>
            </div>
          }

          <Reply
            blog={blog}
            comment={comment}
            commentID={comment._id} />
        </div>
      </div>
    )
}

export default SingleComment