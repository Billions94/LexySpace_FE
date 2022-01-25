import React, { useState } from "react"
import { Formik } from "formik"
import { Form, Button, Col, Alert } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import * as yup from "yup"
import "./styles.scss"


const schema = yup.object({
  
  email: yup.string().email().required("Please Enter your Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    // )
});

interface LoginFormikProps {
  userName?: string
  email: string 
  password: string 
}

const LogIn = () => {

  const url = process.env.REACT_APP_GET_URL

  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const login = async (props: LoginFormikProps) => {
    try {
      const response = await fetch(`${url}/users/login`, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: { 'Content-Type': 'application/json'}
      })
        if(response.ok) {
          const data = await response.json()
              
          const { accessToken, refreshToken } = data
  
          localStorage.setItem('accessToken',  accessToken)
          localStorage.setItem('refreshToken',  refreshToken)
          if(data){
            navigate('/home')
          } else {
            setError(true)
            triggerError()
          }
        } else {
          setError(true)
          triggerError()
        }
    } catch (error) {
      console.log(error)
    }
  }

  const triggerError = () => {
    setTimeout(() => {
      setError(false)
    }, 4000)
  }

  return (
    <div id='loginContainer' className="col3">
                
    <Col sm={6} md={4} className='customMT mx-auto'>
        {
          error === true &&  
          <Alert className="alert" variant='warning'>
            you don't have an account, please register
          </Alert>
        }
        <a href={`${url}/users/googleLogin`}>
          <div className="googleIcon justify-content-center my-2">
              <div>
                <img className='google' src="https://img.icons8.com/color/50/000000/google-logo.png" 
                  alt='' width='20' height='20'/>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 res">
                <button type="button" className="btn googleBtn btn-lg">
                  <p> CONTINUE WITH GOOGLE </p>
                  </button>
              </div>
          </div> 
        </a>               
        <div className="mx-auto">
            <div className='text-center'>OR</div>
        </div>        
       <Formik
          validationSchema={schema}
          onSubmit={login}
          initialValues={{
            email: "",
            password: "" }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <div className="register">
              <h4 className="SignInHeading register1">log IN</h4>
              <Form noValidate className='register' onSubmit={handleSubmit}>

                <Form.Group className='format'
                    controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    className="SignUpFormControls register"
                    size="lg"
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>



                <Form.Group className='format'
                    controlId="formBasicPassword">
                  <Form.Control
                    className="SignUpFormControls register"
                    size="lg"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="loginBtn">
                  <Button variant="primary"
                    className="SignUpButton register text-dark customBtn"
                    type="submit">
                    log In
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
    </Col>
    </div>
  );
};

export default LogIn;
