import { useState, useEffect, FC } from "react";
import { Formik } from "formik";
import { Form, Button, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../loader/Loader";
import API from "../../lib/API";
import { FormikProps } from "./types";
import { loginSchema } from "./schema/login.schema";
import "./styles.scss";

const LogIn: FC = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function login(props: FormikProps): Promise<void> {
    try {
      const { data } = await API.post(`/session/create`, {
        email: props.email,
        password: props.password,
      });

      if (data) {
        setLoading(true);
        const { accessToken, refreshToken } = data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setTimeout(() => {
          setLoading(false);
          navigate("/home");
        }, 1000);
      } else {
        setError(true);
        triggerError();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const triggerError = () => {
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div id="loginContainer" className="col3">
      <div className="text-center createAcc textColor">Login to LexySpace</div>
      <Col sm={6} md={4} className="customMT mx-auto">
        {error === true && (
          <Alert className="alert text-center" variant="danger">
            Email or password is incorrect!
          </Alert>
        )}
        {/* <a href={`${url}/users/googleLogin`}>
          <div className="googleIcon justify-content-center my-2">
              <Col xs={12} sm={12} md={12} lg={12} className="res googleDiv">
                <div>
                  <img className='' src="https://img.icons8.com/color/50/000000/google-logo.png" 
                    alt='' width='20' height='20'/>
                </div>
                  <button type="button" className="btn googleBtn btn-lg">
                  <p> CONTINUE WITH GOOGLE </p>
                  </button>
              </Col>
          </div> 
        </a>               
        <div className="mx-auto">
            <div className='text-center'>OR</div>
        </div>         */}
        <Formik
          validationSchema={loginSchema}
          onSubmit={login}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <div className="register">
              <h4 className="SignInHeading register1 mt-4">LOG IN</h4>
              <Form noValidate className="register" onSubmit={handleSubmit}>
                <Form.Group className="format" controlId="formBasicEmail">
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

                <Form.Group className="format" controlId="formBasicPassword">
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
                  {values.password.length < 5 ? (
                    <Button
                      variant="primary"
                      disabled
                      className="disabled1"
                      type="submit"
                    >
                      Log in
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      className="modal-btn"
                      type="submit"
                    >
                      Log in
                    </Button>
                  )}
                </div>
                <Form.Text>
                  Don't have an account?{" "}
                  <Link className="signin" to="/register">
                    <a href="#signin" className="signin">
                      Sign Up
                    </a>
                  </Link>
                </Form.Text>
              </Form>
            </div>
          )}
        </Formik>
      </Col>
    </div>
  );
};

export default LogIn;
