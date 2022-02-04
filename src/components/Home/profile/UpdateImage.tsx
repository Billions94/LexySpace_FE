import { Modal, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction, createRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPosts, getUsersAction } from "../../../redux/actions"
import { ReduxState, User } from "../../../redux/interfaces"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface UpdateImageProps {
  xUser: User
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  getUser: () => Promise<void>
}

const UpdateImage = ({ xUser, show, setShow, getUser }: UpdateImageProps) => {

  const beUrl = process.env.REACT_APP_GET_URL


  const { id } = useParams()
  const { user } = useSelector((state: ReduxState) => state.data)
  const me = user!._id

    const [image, setImage] = useState<string>('')
    const dispatch = useDispatch()
 
    const target = (e: any) => {
        console.log(e.target.files[0]);
        if (e.target && e.target.files[0]) {
          setImage(e.target.files[0]);
        }
      };
    
      const inputBtn = createRef<HTMLInputElement>()
    
      const openInputFile = () => {
        inputBtn!.current!.click();
      }
    const handleClose = () => setShow(false);

    const updateProfilePic = async () => {
      try {
        const token = localStorage.getItem('accessToken')

        const formDt = new FormData();
        formDt.append("image", image);
        const response = await fetch(`${beUrl}/users/me/profilePic`, {
          method: 'PUT',
          body: formDt,
          headers: { Authorization: `Bearer ${token}` }
        })
        if(response.ok){
          console.log('User Profile successfully updated')
          setShow(false)
          dispatch(getPosts())
          getUser()
        } else {
          throw new Error('Failed to update profile picture')
        }   
      } catch (error) {
        console.log(error);
      }
    }
    
  
  return (
    <div>
      <Modal id='updatePicModal' size='lg' show={show} onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="imgWrapper">
              { id !== me ?
                <img className="ProfilePicture" 
                  src={xUser?.image}
                  alt="ProfilePicture" width="430px" height="430px"/>
                  : 
                <img className="ProfilePicture" 
                  src={user?.image}
                  alt="ProfilePicture" width="430px" height="430px"/>
              }
            </div>
        </Modal.Body>
        { id !== me ? null :
          <Modal.Footer>
            <div >
                <button onClick={openInputFile} className="btn btn-sm btnIcon">
                  <input type="file" ref={inputBtn} className="d-none" onChange={(e) => target(e)} />
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f91880" className="bi bi-card-image" viewBox="0 0 16 16">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                  </svg>
                    <div className="addPhoto">
                        add Photo
                    </div>
                </button>
            </div>
            {!image ?
                   <Button disabled variant="primary" className='modal-btn'>
                     update
                   </Button> :
                  <Button onClick={() => updateProfilePic()} 
                    variant="primary" className='modal-btn'>
                      update
                  </Button>
                }  
          </Modal.Footer>
        }
      </Modal>
    </div>
  );
};

export default UpdateImage;
