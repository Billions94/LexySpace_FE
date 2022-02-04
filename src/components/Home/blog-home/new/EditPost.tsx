import { useState, useEffect, createRef, Dispatch, SetStateAction } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Container, Form, Button, Modal } from "react-bootstrap"
import useAuthGuard from "../../../../lib/index"
import { useSelector, useDispatch } from "react-redux"
import { ReduxState } from "../../../../redux/interfaces"
import "./styles.scss"
import { getPosts } from "../../../../redux/actions"

interface EditProps {
  id: string 
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

const Edit = ({ id, refresh, setRefresh }: EditProps) => {

  useAuthGuard()
  
  const [show, setShow] = useState(false)
  const [media, setMedia] = useState<string>('')
  const { user } = useSelector((state: ReduxState) => state.data)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [post, setPost] = useState({ 
    text: "" 
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  // const { id } = useParams()
  
  const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0])
    }
  }
  
  const inputBtn = createRef<HTMLInputElement>()
  
  const openInputFile = () => {
    inputBtn!.current!.click()
  }
 
  const apiUrl = process.env.REACT_APP_GET_URL

  const editBlogPost = async () => {
    if(media) {
      try {
        const response = await fetch(`${apiUrl}/posts/${id}`, {
          method: "PUT",
          body: JSON.stringify(post),
          headers: { "Content-Type": "application/json" },
        })
        if (response.ok) {
          let data = await response.json()
          console.log(`another console log for the res`, data)
          try {
            const formDt = new FormData()
            formDt.append("media", media)
            let postImage = await fetch(`${apiUrl}/posts/${data._id}/upload`, {
              method: "PUT",
              body: formDt,
            })
            if (postImage.ok) {
              setShow(false)
              refresh === false ? setRefresh(true) : setRefresh(false)
              // navigate("/home")
              dispatch(getPosts())
            }
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log("after ther fail of if block inside th else ")
        }
      } catch (error) {
        console.log("failed catch block")
        console.log(error)
      }
    } else {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" },
      })
      if(response.ok) {
        setShow(false)
        refresh === false ? setRefresh(true) : setRefresh(false)
        // navigate('/home')
        dispatch(getPosts())
      }
    }
  }

  return (
    <Container  className="new-blog-container p-0 mb-0 mt-0">
      <div className="d-flex customLinks" style={{ paddingTop: "-110px" }}>
        <div style={{cursor: "pointer" }}>
          <img alt=''
            className="lrdimg"
            width="17px"
            src="https://img.icons8.com/ios/50/000000/edit--v1.png"
          />
        </div>
        
        <div className="primary" onClick={handleShow}>
          <div style={{ marginLeft: "15px" }}>
            <span>edit</span>
          </div>
        </div>
        

        <Modal id='postModal' size="lg" className="px-4" style={{height: "500px", overflow: "auto"}}
         show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title >edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={user!.image} alt="" 
                  className="roundpic" width={47}/>
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
              placeholder="wanna change something?"
              as="textarea"
              className="textarea"
              rows={5}
              value={post.text}
              onChange={(e) =>
              setPost({ ...post, text: e.target.value })}
              />
          </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div >
                <button onClick={openInputFile} className="btn btn-sm btnIcon">
                <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="#f91880" className="bi bi-card-image" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                </svg>
                </button>
              </div>
            {!post.text ? 
            <Button variant="primary" disabled className='btn btn-md modal-btn' onClick={() => editBlogPost()}>
              update
            </Button> :   
            <Button variant="primary" className='btn btn-md modal-btn' onClick={() => editBlogPost()}>
              update
            </Button>
            }
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  )
}
export default Edit
