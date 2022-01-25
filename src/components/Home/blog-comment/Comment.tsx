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
import SingleComment from "./SingleComment"


interface CommentsProps {
  author: User | null
  blog: Posts | null
  id: string | undefined
  comments: Comments[]
  fetchComments: () => Promise<void>
}

const Comment = ({ blog, id, comments, fetchComments }: CommentsProps) => {

  const dispatch = useDispatch()

  useEffect(() => {
    fetchComments()
    dispatch(getUsersAction())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return comments ? (
    <>
      <Accordion className="" defaultActiveKey="0">
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
                  <SingleComment 
                  id={id}
                  blog={blog}
                  comment={c}
                  comments={comments} 
                  fetchComments={fetchComments}/>
                ))}
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  ) : (<Loader />)
}


export default Comment
