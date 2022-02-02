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
  const [media, setMedia] = useState<string>('')
  // const [video, setVideo] = useState('')

  const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0])
      // setVideo(e.target.files[0])
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
    if (media) {
        try {
            const response = await fetch(`${url}/posts/${userName}`, {
                method: "POST",
                body: JSON.stringify(post),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                const data = await response.json()
                try {
                    const formDt = new FormData()
                    formDt.append("media", media)
                    let postImage = await fetch(`${url}/posts/${data._id}/upload`, {
                        method: "PUT",
                        body: formDt,
                    })
                    if (postImage.ok) {
                        setShow(false)
                        setPost({ text:'' })
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
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                setShow(false)
                setPost({ text: '' })
                getPosts()
            }
        } catch (error) {
            console.log(error)
        }
    }
    
  }

  // const postVideo = async () => {
  //   try {
  //     const response = await fetch(`${url}/posts/${userName}`, {
  //       method: "POST",
  //       body: JSON.stringify(post),
  //       headers: { 'Content-Type': 'application/json' }
  //   })
  //   if (response.ok) {
  //       const data = await response.json()
  //       try {
  //           const formDt = new FormData()
  //           formDt.append("video", video)
  //           let postVideo = await fetch(`${url}/posts/${data._id}/videoUpload?video`, {
  //               method: "PUT",
  //               body: formDt,
  //           })
  //           if (postVideo.ok) {
  //               setShow(false)
  //               setPost({ text:'' })
  //               getPosts()
  //           }
  //       } catch (error) {
  //           console.log(error)
  //       }
  //   }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const check = () => {
  //   if(image) {
  //     newPost()
  //   } else if(video) { postVideo() }
  // }
  

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
                  <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="#f91880" className="bi bi-card-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                  </svg>
                  </button>
                  <button onClick={openInputFile} className="btn btn-sm btnIcon ml-2">
                  <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="#f91880" className="bi bi-paperclip" viewBox="0 0 16 16">
                    <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
                  </svg>
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
