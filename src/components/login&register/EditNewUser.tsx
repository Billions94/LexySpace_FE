import { Form, Col, Row, Button } from "react-bootstrap"
import { createRef, useState, FormEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ReduxState } from "../../redux/interfaces"
import useAuthGuard from "../../lib"
import { getUsersAction } from "../../redux/actions"
import Loader from "../Home/loader/Loader"

const EditNewUser = () => {

    useAuthGuard()

    const apiUrl = process.env.REACT_APP_GET_URL

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state: ReduxState) => state.data)

    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        userName: user!.userName,
        bio: '',
        location: '',
    })
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    useEffect(() => {
        dispatch(getUsersAction())
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    const target = (e: any) => {
        if (e.target && e.target.files[0]) {
            setImage(e.target.files[0])
            setAlert(true)
            setTimeout(() => {
                setAlert(false)
            }, 3000)
        }
    }

    const inputBtn = createRef<HTMLInputElement>()



    const openInputFile = (e: any) => {
        inputBtn!.current!.click();
    }

    const sumbit = async () => {
        if (image) {
            try {
                const token = localStorage.getItem('accessToken')
                const response = await fetch(`${apiUrl}/users/me`, {
                    method: 'PUT',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    try {
                        const formDt = new FormData()
                        formDt.append('image', image)
                        const uploadpic = await fetch(`${apiUrl}/users/me/profilePic`, {
                            method: 'PUT',
                            body: formDt,
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        if (uploadpic.ok) {
                            setLoading(true)
                            setTimeout(() => {
                                setLoading(false)
                                navigate('/home')
                            }, 1000)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const token = localStorage.getItem('accessToken')
                const response = await fetch(`${apiUrl}/users/me`, {
                    method: 'PUT',
                    body: JSON.stringify(newUser),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                if (response.ok) {
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        navigate('/home')
                    }, 1000)
                } else throw new Error('Could not update user')
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleSumbit = (e: FormEvent) => {
        e.preventDefault()
        sumbit()
    }

    return loading === true ? <Loader /> : (
        <Row id='newUserDiv' className='justify-content-center'>
            <Col className='' md={6} lg={5}>
                <div className='welcome1 text-center mb-3'>Edit your User Profile <img src="https://img.icons8.com/fluency/50/ffffff/user-male-circle.png" alt='' height='48px' width='48px' /></div>
                {loading === false ?
                    <Form noValidate className='newUserForm'>
                        {alert === true ?
                        <div className="text-center">
                            <img src='https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif' height='38px' width='38px' alt='' />
                        </div> :
                        <div className="text-center">
                            <button onClick={openInputFile} className="btn btn-lg btnIcon">
                                <input type="file" ref={inputBtn} className="d-none" onChange={(e) => target(e)} />
                                <img src="https://img.icons8.com/fluency/50/ffffff/user-male-circle.png" alt='' height='38px' width='38px' />
                                <div className="addPhoto">
                                    Add image
                                </div>
                            </button>
                        </div>
                        }
                        <Form.Group controlId="blog-form" className="">
                            <Form.Label className="text-muted">first Name</Form.Label>
                            <Form.Control
                                size="lg"
                                className='newUserFormControl'
                                placeholder=""
                                value={newUser.firstName}
                                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="">
                            <Form.Label className="text-muted">last Name</Form.Label>
                            <Form.Control
                                size="lg"
                                className='newUserFormControl'
                                placeholder=""
                                value={newUser.lastName}
                                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="">
                            <Form.Label className="text-muted">bio</Form.Label>
                            <Form.Control
                                size="lg"
                                className='newUserFormControl'
                                as="textarea"
                                placeholder="A little detail about yourself..."
                                value={newUser.bio}
                                onChange={(e) => setNewUser({ ...newUser, bio: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="blog-form" className="">
                            <Form.Label className="text-muted">location</Form.Label>
                            <Form.Control
                                size="lg"
                                className='newUserFormControl'
                                placeholder="Where are you located ?"
                                value={newUser.location}
                                onChange={(e) => setNewUser({ ...newUser, location: e.target.value })} />
                        </Form.Group>
                        <div className='d-flex'>
                            <></>
                            {!newUser.firstName && !newUser.lastName && !newUser.location && !newUser.bio ?
                                <Button variant="primary" onClick={(e) => handleSumbit(e)}
                                    className='btn btn-md modal-btn disabled1'>
                                    submit
                                </Button> :
                                <Button variant="primary" onClick={(e) => handleSumbit(e)}
                                    className='btn btn-md modal-btn'>
                                    sumbit
                                </Button>
                            }
                        </div>
                    </Form>
                    :
                    <Loader />
                }
            </Col>
        </Row>
    )
}

export default EditNewUser