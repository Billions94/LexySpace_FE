import React, { useState, useEffect } from "react"
import { Accordion, Card, Button, Image, Dropdown } from "react-bootstrap"
import Reply from "./blog-reply/Replies"
import { postTimer } from "../../../../lib/index"
import "./styles.scss"
import Loader from "../../loader/Loader"

const Comments = ({ blog, id, comments, fetchComments }) => {

  console.log("i am the comments in cs", comments)

  const [reply, setReply] = useState({
    text: "",
  })
  const [loading, setLoading] = useState(true)


  const apiUrl = process.env.REACT_APP_GET_URL

  const getReplies = async () => {
    try {
      const response = await fetch(`${apiUrl}/replies`)
      if(response.ok) {
        const data = await response.json()
        console.log('reply info', data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const deleteComment = async (c) => {
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

  const replyComment = async (c) => {
    try {
      const response = await fetch(`${apiUrl}/replies/${c._id}`, {
        method: "POST",
        body: JSON.stringify(reply),
        headers: { "Content-Type": "application/json" },
      })
      if (response.ok) {
        setReply({ text: "" })
        getReplies()
      
      }
    } catch (error) {
      console.log("ooops we encountered an error", error)
    }
  }

  

  useEffect(() => {
    fetchComments()
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
                  c.postId !== blog._id ? null : 
                  <div key={c._id}>
                    <Card.Header className="cardHeader">
                      <div className="d-flex col-12">
                        <div>
                          <Image
                            className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                            src={c.user.image}
                            alt="Image Description"
                          />
                        </div>
                        <div className="cAndRDiv cAndR position-relative mb-1 ">
                          <div
                            style={{
                              borderBottom: "1px solid rgb(216, 215, 215)",
                              fontSize: "12px"}}
                            className="text-muted mb-2">
                            Posted: {postTimer(c.createdAt)}
                          </div>
                          <div className="text-dark mt-0 mb-2"
                            style={{ fontSize: "18px", lineHeight: "12px" }}>
                            {c.user.firstName} {c.user.lastName}
                          </div>
                          <div style={{ fontSize: "16px" }}
                            className=" cAndR mb-2 ml-5" >
                            {c.text}
                          </div>

                        </div>
                      </div>
                      

                      <div className="row d-flex align-content-space-between mt-0 mb-5">
                        <button className="btn btn-primary like">
                          <img alt=''
                            className="lrdimg"
                            width="17px"
                            src="https://img.icons8.com/dotty/50/000000/filled-like.png"
                          />
                        </button>

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
                              value={reply.text}
                              onChange={(e) =>
                                setReply({ ...reply, text: e.target.value })
                              }
                              placeholder="write a reply..."/>
                            <br />
                            <button style={{ borderRadius: "50px" }}
                              className="btn btn-dark"
                              onClick={(e) => replyComment(c)}>
                              send
                            </button>
                          </Dropdown.Menu>
                        </Dropdown>

                        <button className="btn btn-primary delete"
                          onClick={(e) => deleteComment(c)}>
                          <img alt=''
                            className="lrdimg"
                            width="16px"
                            src="https://img.icons8.com/fluency/50/000000/delete-sign.png"/>
                        </button>
                      </div>
                      <Reply 
                       blog={blog}
                       comments={comments} />
                    </Card.Header>
                  </div>
                ))}
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  ) : ( <Loader /> )
}


export default Comments
