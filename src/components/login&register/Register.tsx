import { Formik } from "formik"
import * as yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import { Form, Col, Button } from "react-bootstrap"
import "./styles.scss"


const schema = yup.object({
  userName: yup.string().required("Please Enter a username"),
  email: yup.string().email().required("Please Enter your Email"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    )
})

export type FormikProps = {
  userName?: string
  email: string 
  password: string 
}

const Register = () => {

  const beUrl = process.env.REACT_APP_GET_URL

  const navigate = useNavigate()

  const register = async (props: FormikProps) => {
      const response = await fetch(`http://localhost:3001/users/register`, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {'Content-Type': 'application/json'}
      })
      console.log(response)
        if(response.ok) {
          const data = await response.json()
              
          const { accessToken, refreshToken } = data
  
          localStorage.setItem('accessToken',  accessToken)
          localStorage.setItem('refreshToken',  refreshToken)
          navigate('/editNewUser')
        }
  }

  return (
    <div id='loginContainer'>
    <Col sm={6} md={4} className='customMT mx-auto'>
        <a href={`${beUrl}/users/googleLogin`}>
          <div className="googleIcon justify-content-center my-2">
              <div>
                <img className='google' src="https://img.icons8.com/color/50/000000/google-logo.png" 
                  alt='' width='20' height='20'/>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 res">
                <button type="button" className="btn googleBtn btn-lg">SIGN UP WITH GOOGLE</button>
              </div>
          </div> 
        </a> 
        <div className="mx-auto">
              <div className='text-center'>OR</div>
        </div>
       <Formik
          validationSchema={schema}
          onSubmit={register}
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
        >
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
              <h4 className="SignInHeading register1">SIGN UP</h4>
              <Form noValidate className='register' onSubmit={handleSubmit}>
                <Form.Group className='format'
                    controlId="formBasicUserName">
                  <Form.Control
                    size="lg"
                    className="register"
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    placeholder="Username"
                    isInvalid={!!errors.userName}
                  />
                  <Form.Control.Feedback className="FeedBack" type="invalid">
                    {errors.userName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='format'
                    controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    className="register"
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
                    className="register"
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


                <Button
                  variant="primary"
                  className="SignUpButton register text-dark customBtn"
                  type="submit"
                >
                  Sign Up
                </Button>
                <Form.Text>
                  Already a User?{" "}
                  <Link to="/login">
                    <a href="#signin" onClick={()=> navigate("/login")}>
                      Sign In
                    </a>
                  </Link>
                </Form.Text>
              </Form>
            </div>
          )}
        </Formik>
    </Col>
    </div>
  )
}

export default Register
