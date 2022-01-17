import { useState } from "react"
import { Card } from "react-bootstrap"
import BlogAuthor from "../blog-author/BlogAuthor"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CommentModal  from "../new/CommentModal"
import { Posts } from "../../../redux/interfaces"
import { ReduxState } from "../../../redux/interfaces"
import "./styles.scss"


const BlogItem = ({ text, cover, user, _id, createdAt }: Posts) => {
  // console.log('i am the author', user.userName)

  const apiUrl = process.env.REACT_APP_GET_URL

  const newUser = useSelector((state: ReduxState) => state.data.user)

  const [show, setShow] = useState(false)
  const [liked, setLiked] = useState(false)

  const handleShow = ()=> setShow(true)

  const handleClose = ()=> setShow(false)

  const liker = { userId: newUser!._id}

  const toggle = () => {
    liked === false ? likePost() : unLikePost()
  }

  const likePost = () => {
    like()
    setLiked(true)
  }

  const unLikePost = () => {
    like()
    setLiked(false)
  }

  const like = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${apiUrl}/posts/${_id}/likes`, {
        method: 'PUT',
        body: JSON.stringify(liker),
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` }
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
          <Card.Title>{text}</Card.Title>
            <Card.Img variant="top" src={cover} className="blog-cover" />
            <Card.Body className="mb-0">
      
            </Card.Body>
          </Link>
              <div className="d-flex justify-content-around mb-3">
                <div onClick={handleShow}>
                  <button className='candl'>
                    <img className="interactions" src="https://img.icons8.com/dotty/50/000000/send-comment.png"
                    width='27px'/>
                  </button>
                  <CommentModal id={_id} show={show} setShow={setShow} handleClose={handleClose}/>
                </div>
                <div>
                  { liked === false ?
                    <button className='candl'>
                      <img className="interactions" onClick={()=> toggle()}
                       src="https://img.icons8.com/carbon-copy/50/000000/hearts.png"
                        width='32px'/>
                    </button>
                      : 
                      <button className='candl'>
                        <img className="interactions" onClick={()=> toggle()}
                         src="https://img.icons8.com/plasticine/50/000000/hearts.png"
                          width='32px'/>
                      </button>
                  }
                </div>
              </div>
        </div>
    </div>
  )
}

export default BlogItem