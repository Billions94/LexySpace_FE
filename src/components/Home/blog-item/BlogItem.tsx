import { useState, Dispatch, SetStateAction } from "react"
import { Card, Badge, Dropdown, Image, ListGroup } from "react-bootstrap"
import BlogAuthor from "../blog-author/BlogAuthor"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Comments, User } from "../../../redux/interfaces"
import { ReduxState } from "../../../redux/interfaces"
import "./styles.scss"
import CommentModal from "../blog-home/new/CommentModal"
import SharePost from "../blog-home/new/SharePost"
import Edit from "../blog-home/new/EditPost"
import { likeAction, reRouteAction } from "../../../redux/actions"
import { postTimer } from "../../../lib"
import DeleteModal from "./DeleteModal"


interface BlogItemProps {
  text: string
  // cover: string
  media: string
  comments: Comments[]
  user: User
  _id: string
  likes: User[]
  createdAt: Date
  getData: () => Promise<void>
}


const BlogItem = ({ text, media, comments, user, _id, likes, createdAt, getData }: BlogItemProps) => {
  // console.log('i am the author', user.userName)

  const navigate = useNavigate()
  const apiUrl = process.env.REACT_APP_GET_URL
  const dispatch = useDispatch()
  const posts = useSelector((state: ReduxState) => state.posts)
  const newUser = useSelector((state: ReduxState) => state.data.user)
  const me = newUser!._id

  const [show, setShow] = useState(false)
  const [smShow, setSmShow] = useState(false)
  const [share, setShare] = useState(false)
  const [reload, setReload] = useState(false)

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


  let newPost = posts.find(p => p._id === _id)

  // const newPost = posts.find(p => p.sharedPost._id)
  // console.log('the new post', newPost)

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const handleShareShow = () => setShare(true)
  const handleShareClose = () => setShare(false)

  const liker = { userId: newUser!._id }

  const toggle = () => {
    !likes ? likePost() : unLikePost()
  }

  const likePost = () => {
    like()
    dispatch(likeAction())
  }

  const unLikePost = () => {
    like()
    dispatch(likeAction())
  }

  const like = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${apiUrl}/posts/${_id}/likes`, {
        method: 'PUT',
        body: JSON.stringify(liker),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      if (response.ok) {
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


  const doSomething = (id: string | undefined) => {
    navigate(`/posts/${id}`)
    dispatch(reRouteAction(true))

  }

  const route = (id: string | undefined) => {
    navigate(`/posts/${id}`)
    dispatch(reRouteAction(true))
  }


  return (
    <ListGroup>
      <ListGroup.Item style={{ border: "1px solid rgb(216, 215, 215)"}} key={_id} className="blog-card">
        <div className='authorinfo d-flex ' style={{ justifyContent: 'space-between' }}>
          
          <BlogAuthor {...user} createdAt={createdAt} />
          <Dropdown className="dropdowntext ml-auto">
            <Dropdown.Toggle
              className="btn btn-dark dropdownbtn">
              <img alt=''
                className="lrdimg"
                width="17px"
                src="https://img.icons8.com/android/50/000000/more.png" />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdownmenu'>
              <br />

              <a className="customLinks"
                href={`${apiUrl}/posts/${_id}/downloadPDF`}>
                <div
                  style={{ marginTop: "-20px" }}
                  className="d-flex">
                  <div className="mr-3">
                    <img alt=''
                      className="lrdimg"
                      width="17px"
                      src="https://img.icons8.com/ios/50/000000/circled-down.png" />
                  </div>
                  <div >
                    download pdf
                  </div>
                </div>
              </a>
              {user!._id !== me ? null
                :
                <>
                  <Edit id={_id} refresh={reload} setRefresh={setReload}/>
                  <div className="d-flex customLinks">
                    <div className="mr-3">
                      <img alt='' className="lrdimg" width="17px"
                        src="https://img.icons8.com/fluency/50/000000/delete-sign.png" />
                    </div>
                    <div onClick={() => setSmShow(true)} >
                      delete
                    </div>
                  </div>
                  <DeleteModal id={_id} smShow={smShow} setSmShow={setSmShow} deleteBlogPost={deleteBlogPost}/>
                </>
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div onClick={() => doSomething(_id)}
          className="blog-link">
          <div className="d-flex postBody">
            <div>
              <h6>{text}</h6>
              <div>
                { !media ? null : media && media.split('.').slice(-1).join().match('heic|png|jpg|pdf|jpeg') &&
                  <h6> <img src={media} className="blog-cover" /></h6>
                }
                { !media ? null : media && media.split('.').slice(-1).join().match(`mp4|MPEG-4|mkv`) &&  
                <video src={media} className="blog-video" controls autoPlay muted></video> }
              </div>
            </div>
          </div>
          {/* <div className="d-flex postBody">
          </div> */}
        </div>
        {newPost!.sharedPost && newPost!.sharedPost!._id !== _id ?
          <div className='sharePostDiv'>
            <div className='sharePost pt-3'>
              {/* <div className='authorinfo d-flex ' style={{ justifyContent: 'space-between' }}>
                <div className="text-decoration-none" onClick={() => route(newPost!.sharedPost.user._id)} >
                  <div id="authorDetails" className="d-flex">
                    <Image
                      style={{ width: "50px", height: "50px" }}
                      className="blog-author authorDetails"
                      src={user?.image}
                      roundedCircle
                    />
                    <div style={{ marginLeft: "10px" }}>
                      <h6 className="text-dark authorFirstName mb-0">
                        {user?.firstName}
                        { newPost!.sharedPost!.user! && newPost!.sharedPost!.user!.isVerified === true &&
                          <span className=" mt-1 ml-1  d-flex-row align-items-center">
                            <img alt='' className="mr-2" width="15"
                              src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png" />
                          </span>
                        }
                      </h6>
                      <h6 className="text-muted authorUserName mb-1">@{user?.userName}</h6>
                      <h6 className="text-muted postTime">● {postTimer(newPost!.sharedPost.createdAt)} ago</h6>
                    </div>
                  </div>
                </div>
              </div> */}
              
              <div className="d-flex">
              <BlogAuthor {...user}/> <div></div>
              </div>
              <div onClick={() => route(_id)} className="blog-link">
                <Card.Title>{newPost!.sharedPost.text}</Card.Title>
                {!newPost?.sharedPost! ? null : newPost!.sharedPost.media && 
                  newPost!.sharedPost.media.split('.').slice(-1).join().match(`heic|png|jpg|pdf|jpeg`) &&
                  <Card.Img variant="top" src={newPost!.sharedPost.media} className="blog-cover" />
                }
                {!newPost?.sharedPost! ? null : newPost!.sharedPost.media && 
                  newPost!.sharedPost.media.split('.').slice(-1).join().match(`mp4|MPEG-4|mkv`) &&  
                 <video src={newPost!.sharedPost.media} className="blog-video" controls autoPlay muted></video>}
                <Card.Body className="mb-0">

                </Card.Body>
              </div>
            </div>
          </div> : null
        }
        <div className="d-flex justify-content-around mt-1 mb-0">
          <div onMouseEnter={handleCommentLabelShow}
            onMouseLeave={handleCommentLabelClose}
            className='postition-relative'>
            <button className='candl' onClick={handleShow}>
              <img src="https://img.icons8.com/wired/64/000000/comments.png"
                width='20px' />
            </button>
            <button className="text-dark btnX"><span>{comments.length}</span></button>
            {commentLabel === false ? null :
              <Badge pill variant="secondary"
                className='interactionBadge'>
                Comment
              </Badge>
            }
            <CommentModal id={_id} show={show} setShow={setShow} handleClose={handleClose} />
          </div>
          <div onMouseEnter={handleLikeLabelShow}
            onMouseLeave={handleLikeLabelClose}
            className='postition-relative'>
            {!likes.some(elem => elem._id === me) ?
              <>
                <button className='candl'>
                  <img className="interactions" onClick={() => toggle()}
                    src="https://img.icons8.com/wired/64/000000/hearts.png"
                    width='20px' />
                </button>
                <button className="text-dark btnX"><span>{likes.length}</span></button>
                {likeLabel === false ? null :
                  <Badge pill variant="secondary"
                    className='interactionBadge'>
                    Like
                  </Badge>
                }
              </>
              :
              <>
                <button className='candl'>
                  <img className="interactions" onClick={() => toggle()}
                    src="https://img.icons8.com/dusk/64/000000/hearts.png"
                    width='20px' />
                </button>
                <button className="text-dark btnX"><span>{likes.length}</span></button>
                {likeLabel === false ? null :
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
                width='20px' />
            </button>
            {shareLabel === false ? null :
              <Badge pill variant="secondary"
                className='interactionBadge'>
                Share
              </Badge>
            }
            <SharePost id={_id} user={user}
              show={share} setShow={setShare}
              createdAt={createdAt} />
          </div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  )
}

export default BlogItem