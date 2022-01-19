import { Modal, Button, Form } from 'react-bootstrap'
import { ReduxState, Posts } from '../../../redux/interfaces'
import { useState, useEffect, createRef, Dispatch, SetStateAction } from 'react'
import { useSelector } from 'react-redux'

interface SharePostProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

const SharePost = ({ show, setShow }: SharePostProps) => {

    const apiUrl = process.env.REACT_APP_GET_URL

    const { user } = useSelector((state: ReduxState) => state.data)
    const userName = user!.userName

    const [post, setPost] = useState({
        text: ''
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
    }

    return(
        <>
        <Modal id='postModal' show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img src={user!.image} alt="" 
                  className="roundpic" width={47}/>
            </div>
            <div className="ml-2 userInfo">
                <span>{user!.firstName} {user!.lastName}</span>
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
          <Button variant="primary" className='modal-btn' onClick={() => sharePost()}>
            post
          </Button>
        </Modal.Footer>
      </Modal>
        </>
    )
}

export default SharePost