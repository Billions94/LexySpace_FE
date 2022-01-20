import { Container, Dropdown, Image, Col, Badge } from "react-bootstrap"
import { useNavigate, Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import Comment from "../blog-comment/Comment"
import AddComment from "../blog-comment/AddComment"
import Edit from "../new/EditPost"
// import { postTimer } from "../../../lib/index"
import { format } from "date-fns"
import useAuthGuard, { postTimer } from "../../../lib/index"
import { useSelector } from "react-redux"
import Loader from "../loader/Loader"
import { ReduxState } from "../../../redux/interfaces"
import { Posts, Comments, User } from "../../../redux/interfaces"
import "./styles.scss"


const Blog = () => {

  useAuthGuard()

  const { id } = useParams()
  const [comments, setComments] = useState<Comments[]>([])
  const [author, setAuthor] = useState<User | null>(null)
  const [blog, setBlog] = useState<Posts | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const showNHidde = () => {
    show === false ? handleShow() : handleClose()
  }

  
  const navigate = useNavigate()
  
  const url = process.env.REACT_APP_GET_URL
  const posts = useSelector((state: ReduxState) => state.posts)
  const { user } = useSelector((state: ReduxState) => state.data)
  const liker = { userId: user!._id}
  const me = user!._id
  const newPost = posts.find(p => p._id)

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


  const fetchBlog = async (_id: string | undefined) => {
    try {
      const response = await fetch(`${url}/posts/${_id}`)
      if (response.ok) {
        const data: Posts = await response.json()
        setBlog(data)
        console.log("i am the data", data.user)
        setAuthor(data.user)
        setLoading(false)
      } else {
        throw new Error('cannot post')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await fetch(`${url}/comments`)
      if (response.ok) {
        const data: Posts = await response.json()

        const reverseComments = data.comments.reverse()

        setComments(reverseComments)
      } else {
        console.log("after ther fail of if block inside th else ")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBlogPost = async (id: string | undefined) => {
    try {
      const response = await fetch(`${url}/posts/${id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        fetchBlog(id)
        navigate("/home")
      }
    } catch (error) {
      console.log("ooops we encountered an error", error)
    }
  }

  const toggle = (id: string | undefined) => {
    liked === false ? likePost(id) : unLikePost(id)
  }

  const likePost = (id: string | undefined) => {
    like(id)
    setLiked(true)
  }

  const unLikePost = (id: string | undefined) => {
    like(id)
    setLiked(false)
  }

  const like = async (id: string | undefined) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${url}/posts/${id}/likes`, {
        method: 'PUT',
        body: JSON.stringify(liker),
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` }
      })
        if(response.ok) {
          const data = await response.json()
          fetchBlog(id)
          console.log('You liked this post', data)
          console.log(liker)
        }
    } catch (error) {
      console.log(error)
    }
  }

  

  useEffect(() => {
    fetchBlog(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


    return posts ? (
      <>
        <div id='indexDiv' >
          <Container key={blog?._id} className="blog-details-root">
              <Col md={8} className="blogContent mt-4 mb-2">
                <div className='d-flex blogPostTitle'>
                  <div className="text-muted timer">
                    Posted : {postTimer(blog?.createdAt)} ago
                  </div>
                  <Dropdown className="dropdowntext ml-auto">
                    <Dropdown.Toggle
                      className="btn btn-dark dropdownbtn">
                      <img alt=''
                        className="lrdimg"
                        width="17px"
                        src="https://img.icons8.com/carbon-copy/50/000000/menu-2.png"/>
                    </Dropdown.Toggle>
                      <Dropdown.Menu
                        className='dropDownMenu'
                        style={{padding: "18px", borderRadius: "25px", border: "1px solid rgb(216, 215, 215)"}}>
                        <br />

                        <a className="deleteBlog customLinks"
                          href={`${url}/${id}/downloadPDF`}>
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
                        { blog && blog.user._id !== me ? null
                            : 
                          <>
                    <Edit />
                    <div className="d-flex customLinks">
                      <div  className="mr-3">
                        <img alt='' className="lrdimg" width="17px"
                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png"/>
                      </div>
                      <div onClick={(e) => deleteBlogPost(blog?._id)} >
                        delete Post
                      </div> 
                    </div>
                  </>
                }
                </Dropdown.Menu>
              </Dropdown>
            </div>  

          {  
            <div className="blog-details-author">         
                <div className="d-flex align-items-center">
                  <div>
                    <Link to={`/userProfile/${author?._id}`}>
                      <Image style={{ width: "60px", height: "60px" }}
                        className="blog-author authorDetails"
                        src={author?.image}
                        roundedCircle/>
                    </Link>
                  </div>
                  <Link className="text-decoration-none" to={`/userProfile/${author?._id}`}>
                    <div style={{ marginLeft: "10px" }}>
                      <h5 className="text-dark authorDetails">
                        {author?.firstName} {author?.lastName}
                      </h5>
                      <h4 className="text-muted authorUserName">
                        @{author?.userName}</h4>
                    </div>
                  </Link>
                </div>
              </div>
            }
                <div className="mt-3">{blog?.text}</div>
                <div className="mt-2 mb-4">
                    <img className="blog-details-cover" alt=''  
                      src={blog?.cover} width='100%' />
                </div>
                {/* { newPost!.sharedPost!._id !== id ? 
                <>
                  <div className="mt-3">{newPost!.sharedPost!.text}</div>
                  <div className="mt-2">
                      <img className="blog-details-cover" alt=''  
                        src={newPost!.sharedPost!.cover} width='100%' />
                  </div> 
                </>
                  : null
                }  */}

                  <div className="d-flex justify-content-around mt-2"> 
                    <div onMouseEnter={handleCommentLabelShow}
                      onMouseLeave={handleCommentLabelClose}
                      onClick={() => showNHidde()}
                      className='position-relative'>
                    <button className='candl'>
                      <img className="interactions" src="https://img.icons8.com/dotty/50/000000/send-comment.png"
                        width='33px'/>
                    </button>
                    {  commentLabel === false ? null :
                      <Badge pill variant="secondary"
                        className='interactionBadge'>
                        Comment
                      </Badge>
                    }
                    </div>
                    <div onMouseEnter={handleLikeLabelShow}
                        onMouseLeave={handleLikeLabelClose}
                        className='position-relative'>
                      { liked === false ?
                      <>
                        <button className='candl'>
                          <img className="interactions" onClick={()=> toggle(blog?._id)}
                          src="https://img.icons8.com/carbon-copy/50/000000/hearts.png"
                            width='37px'/>
                        </button>
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
                        <img className="interactions" onClick={()=> toggle(blog?._id)}
                          src="https://img.icons8.com/plasticine/50/000000/hearts.png"
                          width='37px'/>
                          </button>
                        { likeLabel === false ? null :
                          <Badge pill variant="secondary"
                            className='interactionBadge'>
                            Like
                          </Badge>
                        }
                      </>
                      }
                      <span className="text-dark">{blog?.likes.length}</span>
                    </div>
                    <div onMouseEnter={handleShareLabelShow} onMouseLeave={handleShareLabelClose}
                      className="interactions position-relative" style={{ marginLeft: "10px" }}>
                      <button className='candl'>
                        <img src="https://img.icons8.com/dotty/50/000000/share.png"
                        width='30px'/>
                      </button>
                      { shareLabel === false ? null :
                        <Badge pill variant="secondary"
                          className='interactionBadge'>
                          Share
                        </Badge>
                      }  
                    </div>
                  </div>
                  { show === false ? null
                  : 
              <AddComment fetchComments={fetchComments} id={id} />
                  }
              <Col className='mb-2'>
              <Comment blog={blog} id={id} comments={comments} 
                author={author} fetchComments={fetchComments}/>
              </Col>
            </Col>
          </Container>
        </div>
      </>
    ) : ( <Loader /> ) 
}

export default Blog
