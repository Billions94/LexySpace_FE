import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Accordion, Card, Button, Image, Dropdown } from "react-bootstrap"
import Reply from "./blog-reply/Reply"
import { postTimer } from "../../../lib/index"
import Loader from "../loader/Loader"
import { Posts, Comments, User, ReduxState } from "../../../redux/interfaces"
import { useDispatch, useSelector } from "react-redux"
import { getUsersAction } from "../../../redux/actions"
import "./styles.scss"


interface CommentsProps {
  author: User | null
  blog: Posts | null
  id: string | undefined
  comments: Comments[]
  fetchComments: () => Promise<void>
}

const Comment = ({ blog, id, comments, fetchComments }: CommentsProps) => {

  const dispatch = useDispatch()
  const { user } = useSelector((state: ReduxState) => state.data)

  const [reply, setReply] = useState({
    text: "",
    user: user!._id
  })



  const apiUrl = process.env.REACT_APP_GET_URL

  const getReplies = async () => {
    try {
      const response = await fetch(`${apiUrl}/replies`)
      if (response.ok) {
        const data = await response.json()
        console.log('reply info', data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (c: Comments) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}/comments/${c._id}`,
        {
          method: "DELETE",
        }
      )
      if (response.ok) {
        fetchComments()
      }
    } catch (error) {
      console.log("ooops we encountered an error", error)
    }
  }

  // const updateComment = async (c: Comments) => {
  //   try {
  //     const response = await fetch(`${apiUrl}/comments/${c}`, {
  //       method: 'PUT',
  //       headers: { 'Content-Type': 'application/json'}
  //     })
  //     if(response.ok) {

  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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



  useEffect(() => {
    fetchComments()
    dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return comments ? (
    <>
      <Accordion className="mt-3" defaultActiveKey="0">
        <Card style={{ border: "none" }}>
          <Card.Header className="cardHeader">
            <Accordion.Toggle
              className="text-dark shareComment"
              as={Button}
              variant="link"
              eventKey="0">
              Show comments
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <div>
              {
                comments.map((c) => (
                  c.postId !== blog?._id ? null :
                    <div key={c._id}>
                      <div className="cardHeader">
                        <div className="d-flex col-12">
                          <Link to={`/userProfile/${user._id}`}>
                            <div>
                              <Image
                                className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                                src={c.user.image}
                                alt="Image Description"
                              />
                            </div>
                          </Link>
                          <div className="cAndR position-relative">
                            <div className="d-flex customBB">
                              <div className="text-muted mb-2">
                                Posted: {postTimer(c.createdAt)}
                              </div>
                              <Dropdown className="dropdowntext ml-auto">
                                <Dropdown.Toggle
                                  className="btn btn-dark dropdownbtn">
                                  <img alt=''
                                    className="lrdimg"
                                    width="15px"
                                    src="https://img.icons8.com/carbon-copy/50/000000/menu-2.png" />
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
                                    <div onClick={(e) => deleteComment(c)}>
                                      delete
                                    </div>
                                  </div>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="text-dark mt-0 mb-2"
                              style={{ fontSize: "18px", lineHeight: "12px" }}>
                              {c.user.firstName} {c.user.lastName}
                            </div>
                            <div style={{ fontSize: "16px" }}
                              className=" cAndR mb-2 ml-5" >
                              {c.text}
                            </div>
                            <span className="replyspan">
                              Reply
                            </span>
                          </div>
                        </div>
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
                                  onClick={() => replyComment(c)}>
                                  <i className="fa fa-pencil fa-fw" /> Reply
                                </button>
                              }
                            </div>
                          </div>
                        </div>

                        <Reply
                          blog={blog}
                          replyComment={replyComment}
                          reply={reply}
                          setReply={setReply}
                          comments={comments} />
                      </div>
                    </div>
                ))}
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  ) : (<Loader />)
}


export default Comment
