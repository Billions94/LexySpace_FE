import { Modal, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { getUsersAction } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import { UpdateImageProps } from "./UpdateImage"
// import API from "../../login&register/Api.js"

const EditProfile = ({ show, setShow }: UpdateImageProps) => {

    const url = process.env.REACT_APP_GET_URL

    const dispatch = useDispatch()

    const handleClose = () => setShow(false);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        bio: '',
        location: '',
    })

    const users = useSelector((state: ReduxState) => state.data.user)


    const edit = async () => {
        try {
            const token = localStorage.getItem('accessToken')

            const response = await fetch(`${url}/users/me`, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json",
                Authorization:  `Bearer ${token}`  }
            })
            if(response.ok) {
                console.log('User Profile successfully updated')
                setShow(false)
                dispatch(getUsersAction())
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (error) {
            console.log(error)
        }
    }

        // const edit = async () => {
        //     try {
        //         const { data } = await API.put('/users/me', { user }, {method: 'PUT'})
        //         if(data) {
        //             console.log('User Profile successfully updated')
        //             dispatch(getUsersAction())
        //             setShow(false)
        //         } else {
        //             throw new Error('Failed to update profile')
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }
    

    return (
    <div>
        <Modal id='editModal' size="lg" className="px-4" style={{height: "500px"}}
            show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title >edit Profile</Modal.Title>
          </Modal.Header>
        <Modal.Body>
            <Form id='form'>
            <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="text-muted">first Name</Form.Label>
                <Form.Control
                size="lg"
                value={user.firstName}
                onChange={(e) => setUser({...user, firstName: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="text-muted">last Name</Form.Label>
                <Form.Control
                size="lg"
                value={user.lastName}
                onChange={(e) => setUser({...user, lastName: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="text-muted">userName</Form.Label>
                <Form.Control
                size="lg"
                value={user.userName}
                onChange={(e) => setUser({...user, userName: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="text-muted">bio</Form.Label>
                <Form.Control
                size="lg"
                as="textarea"
                value={user.bio}
                onChange={(e) => setUser({...user, bio: e.target.value })}/>
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="text-muted">location</Form.Label>
                <Form.Control
                size="lg"
                value={user.location}
                onChange={(e) => setUser({...user, location: e.target.value })}/>
            </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button size="lg" className="modal-btn"
                variant="primary" style={{ marginLeft: "1em" }}
                onClick={() => edit()}>
                update
              </Button>
        </Modal.Footer>
        </Modal>
    </div>
    )
}

export default EditProfile