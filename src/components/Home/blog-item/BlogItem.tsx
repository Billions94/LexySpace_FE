import { useState, Dispatch, SetStateAction } from "react"
import { Card, Badge, Dropdown } from "react-bootstrap"
import BlogAuthor from "../blog-author/BlogAuthor"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Posts, User } from "../../../redux/interfaces"
import { ReduxState } from "../../../redux/interfaces"
import "./styles.scss"
import CommentModal from "../blog-home/new/CommentModal"
import SharePost from "../blog-home/new/SharePost"
import Edit from "../blog-home/new/EditPost"


interface BlogItemProps {
  text: string
  cover: string
  user: User
  _id: string
  likes: User[]
  post: Posts
  createdAt: Date
  getData: () => Promise<void>
  setReRoute: Dispatch<SetStateAction<boolean>>
}


const BlogItem = ({ text, cover, user, _id, likes, createdAt, post, getData, setReRoute }: BlogItemProps) => {
  // console.log('i am the author', user.userName)

  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_GET_URL
  const posts = useSelector((state: ReduxState) => state.posts)
  const newUser = useSelector((state: ReduxState) => state.data.user)
  const me = newUser!._id

  const [show, setShow] = useState(false)
  const [liked, setLiked] = useState(false)
  const [share, setShare] = useState(false)

  // for interaction icons label
  const [commentLabel, setCommentLabel] = useState(false)
  const [likeLabel, setLikeLabel] = useState(false)
  const [shareLabel, setShareLabel] = useState(false)

  const handleCommentLabelShow = () => setCommentLabel(true)
  const handleLikeLabelShow = () => setLikeLabel(true)
  const handleShareLabelShow = () => setShareLabel(true)

  const handleCommentLabelClose = () => setCommentLabel(false)
  const handleLikeLabelClose = () => setLikeLabel(false)
  const handleShareLabelClose = () => setShareLabel(false)


  let newPost = posts.find(p => p._id)

  // const newPost = posts.find(p => p.sharedPost._id)
  // console.log('the new post', newPost)

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

  const deleteBlogPost = async (id: string | undefined) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        getData()
      }
    } catch (error) {
      console.log("ooops we encountered an error", error)
    }
  }

  // console.log('i am the id', _id)
  // console.log('i am the id of shared', newPost?.sharedPost._id)

  const doSomething = (id: string | undefined) => {
    navigate(`/posts/${id}`)
    setReRoute(true)
    
  }

  return (
    <div>
        <div style={{border: "1px solid rgb(216, 215, 215)", borderRadius: "20px"}} key={_id} className="blog-card">
            <div className='authorinfo d-flex ' style={{justifyContent: 'space-between'}}>
              <BlogAuthor {...user} createdAt={createdAt}/>
              <Dropdown className="dropdowntext ml-auto">
                    <Dropdown.Toggle
                      className="btn btn-dark dropdownbtn">
                      <img alt=''
                        className="lrdimg"
                        width="17px"
                        src="https://img.icons8.com/android/50/000000/more.png"/>
                    </Dropdown.Toggle>
                      <Dropdown.Menu className='dropdownmenu'>
                        <br />

                        <a className="deleteBlog customLinks"
                          href={`${apiUrl}/${_id}/downloadPDF`}>
                          <div
                            style={{ marginTop: "-20px" }}
                            className="d-flex">
                            <div className="mr-3">
                              <img alt=''
                                className="lrdimg"
                                width="17px"
                                src="https://img.icons8.com/ios/50/000000/circled-down.png"/>
                            </div>
                            <div >
                              download pdf
                            </div>
                          </div>
                        </a>
                { user!._id !== me ? null
                    : 
                  <>
                    <Edit />
                    <div className="d-flex customLinks">
                      <div  className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png"/>
                      </div>
                      <div onClick={(e) => deleteBlogPost(_id)} >
                        delete 
                      </div> 
                    </div>
                  </>
                }
                </Dropdown.Menu>
              </Dropdown>
            </div>
          <div onClick={() => doSomething(_id)}
          className="blog-link">
            <div className="d-flex mb-0 p-0">
              <div style={{width: '50px'}}></div>
              <div style={{marginLeft: "10px"}}>
                <h6>{text}</h6>
              </div>
            </div>
              <div className="d-flex mb-0 p-0">
              <div style={{width: '50px'}}></div>
              <div style={{marginLeft: "10px"}}>
                <h6> <img  src={cover} className="blog-cover" /></h6>
              </div>
              </div>
          </div>
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
              <div className="d-flex justify-content-around mt-1 mb-0">
                <div onMouseEnter={handleCommentLabelShow}
                    onMouseLeave={handleCommentLabelClose}
                    className='postition-relative'>
                  <button className='candl' onClick={handleShow}>
                  <img src="https://img.icons8.com/wired/64/000000/comments.png"
                    width='20px'/>
                  </button>
                    {  commentLabel === false ? null :
                      <Badge pill variant="secondary"
                        className='interactionBadge'>
                        Comment
                      </Badge>
                    }
                  <CommentModal id={_id} show={show} setShow={setShow} handleClose={handleClose}/>
                </div>
                <div onMouseEnter={handleLikeLabelShow}
                    onMouseLeave={handleLikeLabelClose}
                    className='postition-relative'>
                  { liked === false ?
                    <>
                    <button className='candl'>
                      <img className="interactions" onClick={()=> toggle()}
                       src="https://img.icons8.com/wired/64/000000/hearts.png"
                        width='20px'/>
                    </button>
                    <span className="text-dark">{likes.length}</span>
                    { likeLabel === false ? null :
                      <Badge pill variant="secondary"
                        className='interactionBadge'>
                        Like
                      </Badge>
                    }
                    </>
                      :
                    <>
                      <button className='candl'>
                        <img className="interactions" onClick={()=> toggle()}
                           src="https://img.icons8.com/dusk/64/000000/hearts.png"
                          width='20px'/>
                      </button>
                      <span className="text-dark">{likes.length}</span>
                      { likeLabel === false ? null :
                        <Badge pill variant="secondary"
                          className='interactionBadge'>
                        Like
                        </Badge>
                      }
                    </>
                  }
                </div>
                <div onMouseEnter={handleShareLabelShow}
                    onMouseLeave={handleShareLabelClose}
                    className='postition-relative'>
                  <button className="candl" onClick={handleShareShow}>
                  <img src="https://img.icons8.com/wired/64/000000/share-2.png"
                        width='20px'/>
                  </button>
                  { shareLabel === false ? null :
                    <Badge pill variant="secondary"
                      className='interactionBadge'>
                      Share
                    </Badge>
                  }
                  <SharePost id={_id} user={user}
                    show={share} setShow={setShare}
                    createdAt={createdAt}  />
                </div>
              </div>
        </div>
    </div>
  )
}

export default BlogItem