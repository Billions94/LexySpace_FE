import { createRef, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { SET_COVER } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"


interface CoverProps {
    getUser: () => Promise<void>
}

const Cover = ({ getUser }: CoverProps) => {

    const dispatch = useDispatch()
    const profileCover = useSelector((state: ReduxState) => state.data.cover)
    const [show, setShow] = useState(false);
    const [cover, setCover] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Change Cover Photo

    const target = (e: any) => {
    console.log(e.target.files[0])
    if (e.target && e.target.files[0]) {
      setCover(e.target.files[0])
    }}

    const inputBtn = createRef<HTMLInputElement>()

    const openInputFile = () => {
        inputBtn!.current!.click()
    }

    const beUrl = process.env.REACT_APP_GET_URL

    const newCover = async () => {
    try {
        const token = localStorage.getItem('accessToken')
      const formDt = new FormData()
      formDt.append('cover', cover)
      const response = await fetch(`${beUrl}/users/me/cover`, {
        method: 'POST',
        body: formDt,
        headers: { Authorization: `Bearer ${token}`}
      })
      if(response.ok) {
        const data = await response.json()
        dispatch({
            type: SET_COVER,
            payload: data.cover
        })
        setShow(false)
        getUser()
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log(cover)
  
    return (
      <>
        <Button variant="primary"  className='btn btn-sm coverUpdateBtn' onClick={handleShow}>
        <img src="https://img.icons8.com/stickers/50/000000/edit.png" 
            className='img' width={27}/>
        </Button>
  
        <Modal id='coverModal' size='lg' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update cover</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="imgWrapper">
                <img className='profile-pic' src={profileCover} alt='image' 
                    width="430px" height="430px"/>  
            </div>  
          </Modal.Body>
          <Modal.Footer>
            <button onClick={openInputFile} className="btn btn-sm btnIcon">
              <input type="file" ref={inputBtn} className="d-none" onChange={(e)=> target(e)} />
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f91880" className="bi bi-card-image" viewBox="0 0 16 16">
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                </svg>
            </button>
            <Button variant="primary" onClick={() => newCover()}
                className='ml-auto modal-btn'>
             Update
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}


export default Cover