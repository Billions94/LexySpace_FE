import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import BlogAuthor from "../blog-author/BlogAuthor"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CommentModal  from "../new/CommentModal"
import { Posts, User } from "../../../redux/interfaces"
import { ReduxState } from "../../../redux/interfaces"
import "./styles.scss"
import SharePost from "../new/SharePost"

interface BlogItemProps {
  text: string
  cover: string
  user: User
  _id: string
  likes: User[]
  post: Posts
  createdAt: Date
  getData: () => Promise<void>
}


const BlogItem = ({ text, cover, user, _id, likes, createdAt, post, getData }: BlogItemProps) => {
  // console.log('i am the author', user.userName)

  const apiUrl = process.env.REACT_APP_GET_URL
  const posts = useSelector((state: ReduxState) => state.posts)
  const newUser = useSelector((state: ReduxState) => state.data.user)

  const [show, setShow] = useState(false)
  const [liked, setLiked] = useState(false)
  const [share, setShare] = useState(false)

  let newPost = posts.find(p => p._id)

  // const newPost = posts.find(p => p.sharedPost._id)
  console.log('the new post', newPost)

  const handleShow = ()=> setShow(true)
  const handleClose = ()=> setShow(false)

  const handleShareShow = ()=> setShare(true)
  const handleShareClose = ()=> setShare(false)

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
          getData()
          console.log('You liked this post', data)
          console.log(liker)
        }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('i am the id', _id)
  // console.log('i am the id of shared', newPost?.sharedPost._id)


  return (
    <div>
        <div style={{border: "1px solid rgb(216, 215, 215)", borderRadius: "20px"}} key={_id} className="blog-card">
            <div className='authorinfo d-flex ' style={{justifyContent: 'space-between'}}>
              <BlogAuthor {...user} createdAt={createdAt}/>
            </div>
          <Link to={`/posts/${_id}`} className="blog-link">
          <Card.Title>{text}</Card.Title>
            <Card.Img variant="top" src={cover} className="blog-cover" />
            <Card.Body className="mb-0 p-0">
      
            </Card.Body>
          </Link>
            {/* { newPost!.sharedPost!._id === _id ? 
              <div className='sharePostDiv'>
              <div className='sharePost'>
                  <div className='authorinfo d-flex ' style={{justifyContent: 'space-between'}}>
                  <BlogAuthor {...user} createdAt={createdAt}/>
                  </div>
                  <Link to={`/posts/${newPost!._id}`} className="blog-link">
                  <Card.Title>{newPost!.sharedPost!.text}</Card.Title>
                      <Card.Img variant="top" src={newPost!.sharedPost!.cover} className="blog-cover" />
                      <Card.Body className="mb-0">
                        
                      </Card.Body>
                  </Link>
              </div>
              </div> : null            
            } */}
              <div className="d-flex justify-content-around mt-3 mb-3">
                <div>
                  <button className='candl' onClick={handleShow}>
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
                          src="https://img.icons8.com/doodle/50/000000/hearts--v1.png"
                          width='32px'/>
                      </button>
                  }
                <span className="text-dark">{likes.length}</span>
                </div>
                <div>
                  <button className="candl" onClick={handleShareShow}>
                    share
                  </button>
                  <SharePost id={_id}
                    show={share} setShow={setShare}
                    createdAt={createdAt}  />
                </div>
              </div>
        </div>
    </div>
  )
}

export default BlogItem