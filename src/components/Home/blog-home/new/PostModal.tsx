import { useState, Dispatch, SetStateAction, useRef, createRef, LegacyRef } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_BLOGS } from "../../../../redux/actions"
import useAuthGuard from "../../../../lib/index"
import { ReduxState } from "../../../../redux/interfaces"
import "./styles.scss"


interface PostModalProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const PostModal = ({ show, setShow }: PostModalProps) => {

  useAuthGuard()
  
  const url = process.env.REACT_APP_GET_URL!
  const token = process.env.TOKEN

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state: ReduxState) => state.data)
  const userName = user!.userName



  const handleClose = () => setShow(false)

  const [post, setPost] = useState({ 
    text: "" 
  })
  const [image, setImage] = useState<string>('')

  const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const inputBtn = createRef<HTMLInputElement>()

  const openInputFile = () => {
    inputBtn!.current!.click()
  }

  const getPosts = async () => {
    try {
      const response = await fetch(`${url}/posts`)
        if(response.ok) {
          const { posts } = await response.json()
          const newPost = posts.reverse()
          dispatch({
            type: GET_BLOGS,
            payload: newPost
          })
        }
    } catch (error) {
      console.log(error)
    }
  }

  const newPost = async () => {
    if(image) {
      try {
        const response = await fetch(`${url}/posts/${userName}`, {
          method: "POST",
          body: JSON.stringify(post),
          headers: { 'Content-Type': 'application/json' }
        })  
            if(response.ok) {
              const data = await response.json()
              console.log('post successful', data)
              setPost({ text: '' })
              try {
                const formDt = new FormData()
                formDt.append("cover", image)
                let postImage = await fetch(`${url}/posts/${data._id}/upload`, {
                  method: "PUT", 
                  body: formDt,
                })
                if (postImage.ok) {
                  setShow(false)
                  navigate('/home')
                  getPosts()
                }
              } catch (error) {
                console.log(error)
              }
            }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await fetch(`${url}/posts/${userName}`, {
          method: "POST",
          body: JSON.stringify(post),
          headers: { 'Content-Type': 'application/json'
          }})
          if(response.ok) {
            setShow(false)
            setPost({ text: '' })
            getPosts()
          }
      } catch (error) {
        console.log(error)
      }
    }
  }
  

  return (
    <>
      <Modal id='postModal'  show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>start A Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={user!.image} alt="" 
                  className="roundpic" width={47} height={47}/>
            </div>
            <div className="ml-2 userInfo">
                <span>
                  {user!.firstName} {user!.lastName}
                  { user!.isVerified === true &&
                    <span className=" mt-1 ml-1  d-flex-row align-items-center">
                    <img alt='' className="mr-2" width="15"
                       src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"/>
                    </span>
                  }
                </span>
            </div>
          </div>
          <Form.Group controlId="blog-content" className="form1 mt-3">
            <Form.Control
              placeholder="what's poppin?"
              as="textarea"
              className="textarea"
              rows={5}
              value={post.text}
              onChange={(e) =>
              setPost({ ...post, text: e.target.value })}
              />
          </Form.Group>
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
          <Button variant="primary" className='btn btn-md modal-btn' onClick={() => newPost()}>
            post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PostModal
