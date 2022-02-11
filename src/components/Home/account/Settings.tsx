import { useEffect, useState } from "react"
import { Row, Col, ListGroup, Card, Accordion, Button} from "react-bootstrap"
import { OverlayTrigger, Popover, Form, Container, Alert } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getUsersAction } from "../../../redux/actions"
import { ReduxState } from "../../../redux/interfaces"
import API from "../../../lib/API"
import "./styles.scss";

const Settings = () => {

  const url = process.env.REACT_APP_GET_URL;
  const feUrl = process.env.REACT_APP_FE_URL
  const navigate = useNavigate()

  const  users  = useSelector((state: ReduxState) => state.data.user)
  const me = users._id
  const dispatch = useDispatch()

  const [user, setUser] = useState({
    password: '',
    confirmPassword: ''
  })

  const [alert, setAlert] = useState(false)
  const [match, setMatch] = useState(false)

  // const changePassword = async () => {
  //   try {
  //     const token = localStorage.getItem('accessToken')

  //     const response = await fetch(`${url}/users/me`, {
  //       method: 'PUT',
  //       body: JSON.stringify({user}),
  //       headers: { "Content-Type": "application/json",
  //       Authorization: token }
  //     })  
  //       if(response.ok) {
  //         setUser({
  //           password: '',
  //           confirmPassword: ''
  //         })
  //         setAlert(true)
  //       }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }


  const changePassword = async () => {
    try {
      const { data } = await API.put('/users/me', { user })
      if(data) {
        setUser({
          password: '',
          confirmPassword: ''
          })
        setAlert(true)        
      } else {
        throw new Error("Couldn't update password")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checkPasswords = () => {
    if(user.password === user.confirmPassword) {
      changePassword()
      triggerError()
    } else {
      setMatch(true)
      setTimeout(() => {
        setMatch(false)
      }, 6000)
    } 
  }

  const triggerError = () => {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
  }

  useEffect(()=> {
    dispatch(getUsersAction())
  },[])
  return (
    <Row className="justify-content-center">
      <Col className='settingsCol' md={7}>
        <ListGroup id="listGroup">
          <div className="profileInfo">
            <ListGroup.Item><h4 className="customh3">profile Information</h4></ListGroup.Item>
            <ListGroup.Item>
              {/* <a href={`${feUrl}/userProfile/me`} className="a-links"> */}
                <div onClick={()=> navigate(`/userProfile/${me}`)}
                    className="d-flex a-links justify-content-between">
                  <div>
                    <h5>Name, location, bio</h5>
                    <p className="text-muted">
                      choose how your name and profile info will be displayed to
                      others
                    </p>
                  </div>
                  <div>Change</div>
                </div>
              {/* </a> */}
            </ListGroup.Item>
          </div>
          <div className="">
            <ListGroup.Item className="customListItem">
              <h4 className="customh3">account Management</h4>
            </ListGroup.Item>
            <ListGroup.Item>
              {/* <a href={`${feUrl}/closeAccount`} className="a-links"> */}
                <div onClick={()=> navigate(`/closeAccount`)}
                    className="d-flex a-links justify-content-between">
                  <div>
                    <h5>close and Delete account</h5>
                    <p className="text-muted">
                      learn about your options and decide if you want to delete your account
                    </p>
                  </div>
                  <div>Change</div>
                </div>
              {/* </a> */}
            </ListGroup.Item>
          </div>
          <div className="accountAccess">
            <ListGroup.Item className="customListItem">
              <h4 className="customh3">account Access</h4>
            </ListGroup.Item>
            <ListGroup.Item className='py-0 px-1'>
            <Accordion id="accordion">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="text-left">email Addresses</h5>
                      <p className="text-muted">
                        add or remove email addresses on your account.
                      </p>
                    </div>
                    <div>Change</div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Container id='passwordContainer'>
                    <div>
               
                    </div>
                  <Form id='form'>
                  <Form.Group controlId="blog-form" className="mt-3 formgroup">
                      <Form.Label>email Address</Form.Label>
                      <Form.Control
                      size="lg"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) => setUser({...user, confirmPassword: e.target.value })}/>
                  </Form.Group>
                  <Button className="save-btn"
                    onClick={() => checkPasswords()}>
                    save
                  </Button>
                  </Form>
                  </Container>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
            </ListGroup.Item>
            <ListGroup.Item className='signInSecurity'> 
          <Accordion id="accordion">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h5 className="text-left">password</h5>
                      <p className="text-muted">
                        change Your Password
                      </p>
                    </div>
                    <div>Change</div>
                  </div>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Container id='passwordContainer'>
                    {
                      alert === true ?   
                      <Alert className="alert" variant='success'>
                        password successfully changed!
                      </Alert> : null
                    }
                    {
                      match === true ?   
                      <Alert className="alert" variant='warning'>
                        passwords do not match!
                      </Alert> : null
                    }
                    <div className="text-muted">
                    Create a new password that is at least 8 characters long.
                    </div>
                    <div>
                    <img src="https://img.icons8.com/fluency-systems-filled/50/000000/security-shield-green.png" width='20px'/>
                      <OverlayTrigger
                          trigger="click"
                          placement='bottom' 
                          overlay={
                            <Popover id=''>
                            <Popover.Title as="h3"></Popover.Title>
                            <Popover.Content id='overlay'>
                              <h5 className='customH5'>Choose a strong password to protect your account</h5>
                              <span className='customSpan'>It <strong>should</strong> be a mix of letters, numbers and special characters</span>
                              <br />
                              <span className='customSpan'>It <strong>should</strong> be atleast 8 characters long</span>
                              <br />
                              <span className='customSpan'>It <strong>should not</strong> contain your name, phone number or email address</span>
                            </Popover.Content>
                          </Popover>}>
                      <Button className='overlay-btn ml-2'>
                        <span>What makes a strong password?</span>
                      </Button>
                    </OverlayTrigger>
                    </div>
                  <Form id='form'>
                  <Form.Group controlId="blog-form" className="mt-3 formgroup">
                      <Form.Label>password</Form.Label>
                      <Form.Control
                      size="lg"
                      type="password"
                      value={user.password}
                      onChange={(e) => setUser({...user, password: e.target.value })}/>
                  </Form.Group>
                  <Form.Group controlId="blog-form" className="mt-3 formgroup">
                      <Form.Label>confirm Password</Form.Label>
                      <Form.Control
                      size="lg"
                      type="password"
                      value={user.confirmPassword}
                      onChange={(e) => setUser({...user, confirmPassword: e.target.value })}/>
                  </Form.Group>
                  <Button  className="save-btn"
                    onClick={() => checkPasswords()}>
                    save
                  </Button>
                  </Form>
                  </Container>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </ListGroup.Item>
          </div>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default Settings;
