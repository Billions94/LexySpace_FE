import { Row, Col, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../../login&register/Api.js"
import { getUsersAction } from "../../../redux/actions/index.js"
import Loader from "../loader/Loader.jsx"

const CloseAccount = () => {

    const feUrl = process.env.REACT_APP_FE_URL
    const beUrl = process.env.REACT_APP_GET_URL

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const { users } = useSelector(state => state.data)
    console.log(' i am the user', users)
    const [text, setText] = useState('')


    const deleteUserProfile = async () => {
        try {
            const { data } = await API.delete('/users/me')
            if(data) {
                alert('User account successfully deleted')
                navigate('/')
            } else {
                throw new Error('User account could not be deleted')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        dispatch(getUsersAction())
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


  return users ? (
    <Row id='closeAccount' className="justify-content-center mt-5">
      <Col xs={4} sm={4} md={7}>
        <div>
          <h4>{users.firstName} {users.lastName}, we are sorry to see you leave 😔</h4>
          <p>are you sure you want to close your Account ?</p>
        </div>
        <div className="mt-5">
            <h5>tell us why you are closing your account:</h5>
            <Form className="mt-3">
                <input type="radio" id="age1" name="age" value="30"/>
                <label for="age1" className="ml-1 text-muted"> Need time away from social media</label>
                <br/>
                <input type="radio" id="age2" name="age" value="60"/>
                <label for="age2" className="ml-1 text-muted"> Too distracting</label>
                <br/>  
                <input type="radio" id="age3" name="age" value="100"/>
                <label for="age3" className="ml-1 text-muted"> Other</label>
                <br/><br/>
                <textarea className="form-control dmText"
                    type="textarea"
                    rows={4}
                    value={text}
                    onChange={(e) => setText(e.target.value)}/>
                <a href={`${feUrl}/settings`}>
                <Button className='submitBtn mt-3'>
                    back to Settings
                </Button>
                </a>    
                <Button className='submitBtn mt-3 ml-2'
                        onClick={() => deleteUserProfile()}>
                    submit
                </Button>
            </Form>
        </div>
      </Col>
    </Row>
  ) : ( <Loader /> )
};

export default CloseAccount;
