import { useState, createRef, Dispatch, SetStateAction } from 'react'
import { Modal, Button, Form, Card } from 'react-bootstrap'
import { ReduxState, Posts, User } from '../../../../redux/interfaces'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import BlogAuthor from '../../blog-author/BlogAuthor'
import { getPosts } from '../../../../redux/actions'

interface SharePostProps {
    id: string | undefined
    user: User 
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    createdAt: Date 
}

const SharePost = ({ id, user, show, setShow, createdAt }: SharePostProps) => {

    const apiUrl = process.env.REACT_APP_GET_URL
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const posts = useSelector((state: ReduxState) => state.posts)
    const  loggedInUser = useSelector((state: ReduxState) => state.data.user)
    const userName = loggedInUser!.userName
    const sharePostBody = posts.map(p => p).find(p => p._id === id)

    const [post, setPost] = useState({
        text: '',
        sharedPost: sharePostBody!
    })
    const [image, setImage] = useState('')
    const handleClose = () => setShow(false)

    const target = (e: any) => {
        if(e.target && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const inputBtn = createRef<HTMLInputElement>()

    const openInputFile = () => {
      inputBtn!.current!.click()
    }

    const sharePost = async () => {
        if(image) {
            try {
                const response = await fetch(`${apiUrl}/posts/${userName}`, {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: { 'Content-Type': 'application' }
                })
                if(response.ok) {
                    const data: Posts = await response.json()
                    const postId = data._id
                    try {
                        const formDt = new FormData()
                        formDt.append('image', image)
                        const uploadCover = await fetch(`${apiUrl}/posts/${postId}/upload`, {
                            method: 'PUT',
                            body: formDt
                        })
                        if(uploadCover.ok) {
                            setShow(false)
                            navigate('/home')
                            dispatch(getPosts())
                        } else throw new Error('File could not be uploaded')
                    } catch (error) {
                        console.log(error)
                    }
                } else {
                    throw new Error('Unable to share post')
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const response = await fetch(`${apiUrl}/posts/${userName}`, {
                    method: 'POST',
                    body: JSON.stringify(post),
                    headers: { 'Content-Type': 'application/json' }
                })
                if(response.ok) {
                    setShow(false)
                    // navigate('/home')
                    dispatch(getPosts())
                }
            } catch (error) {
                
            }
        }
    }

    return(
        <>
        <Modal id='shareModal' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={loggedInUser!.image} alt="" 
                  className="roundpic" width={47} height={47}/>
            </div>
            <div className="ml-2 userInfo">
                <span>{loggedInUser!.firstName} {loggedInUser!.lastName}</span>
            </div>
          </div>
          <Form.Group controlId="blog-content" className="form1 mt-3">
            <Form.Control
              placeholder="start typing...."
              as="textarea"
              className="textarea"
              rows={5}
              value={post.text}
              onChange={(e) =>
              setPost({ ...post, text: e.target.value })}
              />
          </Form.Group>
          <div className='sharePostDiv'>
            <div className='sharePost'>
                <div className='authorinfo d-flex ' style={{justifyContent: 'space-between'}}>
                <BlogAuthor {...user} createdAt={createdAt}/>
                </div>
                <Link to={`/posts/${post.sharedPost._id}`} className="blog-link">
                <Card.Title>{post.sharedPost.text}</Card.Title>
                    <Card.Img variant="top" src={post.sharedPost.cover} className="blog-cover" />
                    <Card.Body className="mb-0">
            
                    </Card.Body>
                </Link>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='mt-0'>
                <div >
                  <button onClick={openInputFile} className="btn btn-sm btnIcon">
                  <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                    <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' height='27px' width='27px'/>
                  </button>
                  <button onClick={openInputFile} className="btn btn-sm btnIcon ml-2">
                  <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                    <img src="https://img.icons8.com/dotty/50/000000/attach.png" alt='' height='27px' width='27px'/>
                  </button>
                </div>
          <Button variant="primary" className='modal-btn' onClick={() => sharePost()}>
            post
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default SharePost