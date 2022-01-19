import { Modal, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction, createRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import { useSelector } from "react-redux";

interface UpdateImageProps {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
}

const UpdateImage = ({ show, setShow }: UpdateImageProps) => {

  const beUrl = process.env.REACT_APP_GET_URL

  const { user } = useSelector((state: ReduxState) => state.data)

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
    
    useEffect(()=> {
      dispatch(getUsersAction())
    }, [updateProfilePic])
  
  return (
    <div>
      <Modal id='updatePicModal' show={show} onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className="imgWrapper">
                <img className="profile-pic" 
                  src={user?.image}
                  alt="ProfilePicture" width="130" height="130"/>
            </div>
        </Modal.Body>
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
          variant="primary" className='modal-btn'>update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateImage;
