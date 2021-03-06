import { Modal, Form, Button } from "react-bootstrap"
import { useState, Dispatch, SetStateAction } from "react"
// import API from "../../login&register/Api.js"

interface EditProfileProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
    getUser: () => Promise<void>
}

const EditProfile = ({ show, setShow, getUser }: EditProfileProps) => {

    const url = process.env.REACT_APP_GET_URL
    const handleClose = () => setShow(false);

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        bio: '',
        location: '',
    })

    const edit = async () => {
        try {
            const token = localStorage.getItem('accessToken')

            const response = await fetch(`${url}/users/me`, {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.ok) {
                console.log('User Profile successfully updated')
                setShow(false)
                getUser()
            } else {
                throw new Error('Failed to update profile')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Modal id='editModal' size="lg" centered className="px-4" 
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
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="mt-3">
                            <Form.Label className="text-muted">last Name</Form.Label>
                            <Form.Control
                                size="lg"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="mt-3">
                            <Form.Label className="text-muted">userName</Form.Label>
                            <Form.Control
                                size="lg"
                                value={user.userName}
                                onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="mt-3">
                            <Form.Label className="text-muted">bio</Form.Label>
                            <Form.Control
                                size="lg"
                                as="textarea"
                                value={user.bio}
                                onChange={(e) => setUser({ ...user, bio: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="mt-3">
                            <Form.Label className="text-muted">location</Form.Label>
                            <Form.Control
                                size="lg"
                                value={user.location}
                                onChange={(e) => setUser({ ...user, location: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {!user.firstName && !user.lastName && !user.userName && !user.bio && !user.location ?
                        <Button size="lg" disabled className="modal-btn"
                            variant="primary" style={{ fontSize: '15px' }}>
                            update
                        </Button> :
                        <Button size="lg" className="modal-btn"
                            variant="primary" style={{ fontSize: '15px' }}
                            onClick={() => edit()}>
                            update
                        </Button>
                    }
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditProfile