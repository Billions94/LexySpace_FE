import { Form, Col, Row, Button } from "react-bootstrap"
import { createRef, useState, FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { ReduxState } from "../../redux/interfaces"
import useAuthGuard from "../../lib"

const EditNewUser = () => {

    useAuthGuard()

    const apiUrl = process.env.REACT_APP_GET_URL

    const navigate = useNavigate()
    const { user } = useSelector((state: ReduxState) => state.data)

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        userName: user!.userName,
        bio: '',
        location: '',
    })
    const [image, setImage] = useState('')

    const target = (e: any) => {
        if(e.target && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const inputBtn = createRef<HTMLInputElement>()
    
    const openInputFile = () => {
      inputBtn!.current!.click();
    }

    const sumbit = async () => {
        try {
            const token = localStorage.getItem('accessToken')
            const response = await fetch(`${apiUrl}/users/me`, {
                method: 'PUT',
                body: JSON.stringify(newUser),
                headers:{ 'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` }
            })
            if(response.ok) {
                try {
                    const formDt = new FormData()
                    formDt.append('image', image)
                    const uploadpic = await fetch(`${apiUrl}/users/me/profilePic`, {
                        method: 'PUT',
                        body: formDt,
                        headers: { Authorization: `Bearer ${token}`}
                    })
                    if(uploadpic.ok) {
                        navigate('/home')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSumbit = (e: FormEvent) => {
        e.preventDefault()
        sumbit()
    }

    return (
        <Row id='newUserForm' className='justify-content-center'>
            <Col className='formCol' md={6} lg={5}>
                <Form noValidate className='newUserForm' onSubmit={handleSumbit}>
                    <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label className="text-muted">first Name</Form.Label>
                    <Form.Control
                    size="sm"
                    className='newUserFormControl'
                    value={newUser.firstName}
                    onChange={(e) => setNewUser({...newUser, firstName: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label className="text-muted">last Name</Form.Label>
                    <Form.Control
                    size="sm"
                    className='newUserFormControl'
                    value={newUser.lastName}
                    onChange={(e) => setNewUser({...newUser, lastName: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label className="text-muted">userName</Form.Label>
                    <Form.Control
                    size="sm"
                    className='newUserFormControl'
                    value={newUser.userName}
                    onChange={(e) => setNewUser({...newUser, userName: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label className="text-muted">bio</Form.Label>
                    <Form.Control
                    size="sm"
                    className='newUserFormControl'
                    as="textarea"
                    value={newUser.bio}
                    onChange={(e) => setNewUser({...newUser, bio: e.target.value })}/>
                </Form.Group>
                <Form.Group controlId="blog-form" className="mt-3">
                    <Form.Label className="text-muted">location</Form.Label>
                    <Form.Control
                    size="sm"
                    className='newUserFormControl'
                    value={newUser.location}
                    onChange={(e) => setNewUser({...newUser, location: e.target.value })}/>
                </Form.Group>
                <div >
                    <button onClick={openInputFile} className="btn btn-sm btnIcon">
                    <input type="file" ref={inputBtn} className="d-none" onChange={(e) => target(e)} />
                        <img src="https://img.icons8.com/wired/50/000000/picture.png" alt='' width='27px'/>
                        <div className="addPhoto">
                            add Photo
                        </div>
                    </button>
                </div>
                <div className='d-flex'>
                    <></>
                    <Button type='submit' className='ml-auto'>
                        sumbit
                    </Button>
                </div>
                </Form>
            </Col>
        </Row>
    )
}

export default EditNewUser