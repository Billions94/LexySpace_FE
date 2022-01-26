import { Modal, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction, createRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../../../redux/actions"
import { ReduxState, User } from "../../../redux/interfaces"
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

interface UpdateImageProps {
  xUser: User
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const UpdateImage = ({ xUser, show, setShow }: UpdateImageProps) => {

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
        } else {
          throw new Error('Failed to update profile picture')
        }   
      } catch (error) {
        console.log(error);
      }
    }
    
    // useEffect(()=> {
    //   dispatch(getUsersAction())
    // }, [updateProfilePic])
  
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
                    <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' width='27px'/>
                    <div className="addPhoto">
                        add Photo
                    </div>
                </button>
            </div>
          <Button onClick={() => updateProfilePic()} 
          variant="primary" className='modal-btn'>update
          </Button>
          </Modal.Footer>
        }
      </Modal>
    </div>
  );
};

export default UpdateImage;
