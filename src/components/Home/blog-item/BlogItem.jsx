import React, { useState } from "react";
import { Card } from "react-bootstrap";
import BlogAuthor from "../blog-author/BlogAuthor";
import { Link } from "react-router-dom";
import "./styles.scss";
import { useSelector } from "react-redux";
import CommentModal  from "../new/CommentModal"


const BlogItem = ({ text, cover, user, _id, createdAt } ) => {
  // console.log('i am the author', user.userName)

  const apiUrl = process.env.REACT_APP_GET_URL

  const { users } = useSelector(state => state.data)

  const [show, setShow] = useState(false)

  const handleShow = ()=> setShow(true)

  const handleClose = ()=> setShow(false)

  const liker = { userID: users._id}

  const like = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${apiUrl}/posts/${_id}/likes`, {
        method: 'PUT',
        body: JSON.stringify(liker),
        headers: { 
          'Content-Type': 'application/json',
          Authorization: token }
      })
        if(response.ok) {
          const data = await response.json()
          console.log('You liked this post', data)
          console.log(liker)
        }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div>
        <div style={{border: "1px solid rgb(216, 215, 215)", borderRadius: "20px"}} key={_id} className="blog-card">
            <div className='authorinfo d-flex ' style={{justifyContent: 'space-between'}}>
              <BlogAuthor {...user} createdAt={createdAt}/>
            </div>
          <Link to={`/posts/${_id}`} className="blog-link">
            <Card.Img variant="top" src={cover} className="blog-cover" />
            <Card.Body className="mb-0">
              <Card.Title>{text}</Card.Title>
            </Card.Body>
          </Link>
              <div className="d-flex justify-content-around mb-3">
                <div onClick={handleShow}>
                <img className="interactions" src="https://img.icons8.com/dotty/50/000000/send-comment.png"
                  width='27px'/>
                  <CommentModal id={_id} show={show} setShow={setShow} handleClose={handleClose}/>
                </div>
                <div>
                <img className="interactions" onClick={()=> like()}
                  src="https://img.icons8.com/dotty/50/000000/hearts.png"
                  width='27px'/>
                </div>
              </div>
          {/* <Card.Footer style={{borderTop: "1px solid black"}}>
              <div className='d-flex ' style={{justifyContent: 'space-between'}}>
              <BlogAuthor {...user} />
              </div>
          </Card.Footer> */}
        </div>
    </div>
  )
}

export default BlogItem