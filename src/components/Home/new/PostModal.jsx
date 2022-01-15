import { useState, useRef } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { GET_BLOGS } from "../../../redux/actions/index"
import useAuthGuard from "../../../../hooks";


const PostModal = ({ show, setShow}) => {

  useAuthGuard()
  
  const url = process.env.REACT_APP_GET_URL
  const token = process.env.TOKEN

  const navigate = useNavigate()

  const { users } = useSelector(state => state.data)

  const dispatch = useDispatch()

  const userName = users.userName
  console.log('i am the user name', userName)

  const handleClose = () => setShow(false);

  const [post, setPost] = useState({ 
    text: "" 
  })
  const [image, setImage] = useState()

  const target = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const inputBtn = useRef()

  const openInputFile = () => {
    inputBtn.current.click();
  }

  const getPosts = async () => {
    try {
      const response = await fetch(`${url}/posts`)
        if(response.ok) {
          const { posts } = await response.json()
          dispatch({
            type: GET_BLOGS,
            payload: posts
          })
        }
    } catch (error) {
      console.log(error)
    }
  }

  const newPost = async (e) => {
    try {
      const response = await fetch(`${url}/posts/${userName}`, {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json',
            Authorization: token,
        }
      })  
          if(response.ok) {
            const data = await response.json()
            console.log('post successful', data)
            setPost({ text: '' })
            try {
              const formDt = new FormData();
              formDt.append("cover", image);
              let postImage = await fetch(`${url}/posts/${data._id}/upload`, {
                method: "PUT", 
                body: formDt,
                headers: {
                  'Content-Type': 'application/json',
                    Authorization: token,
                },
              });
              if (postImage.ok) {
                setShow(false)
                navigate('/home')
                getPosts()
              }
            } catch (error) {
              console.log(error);
            }
          }
    } catch (error) {
      console.log(error)
    }
  }
  

  return (
    <>
      <Modal id='postModal' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>start A Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={users.image} alt="" 
                  className="roundpic" width={47}/>
            </div>
            <div className="ml-2 userInfo">
                <span>{users.firstName} {users.lastName}</span>
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
                  <input type="file" ref={inputBtn} className="d-none" onChange={target} />
                    <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' height='27px' width='27px'/>
                  </button>
                  <button onClick={openInputFile} className="btn btn-sm btnIcon ml-2">
                  <input type="file" ref={inputBtn} className="d-none" onChange={target} />
                    <img src="https://img.icons8.com/dotty/50/000000/attach.png" alt='' height='27px' width='27px'/>
                  </button>
                </div>
          <Button variant="primary" className='modal-btn' onClick={() => newPost()}>
            send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
