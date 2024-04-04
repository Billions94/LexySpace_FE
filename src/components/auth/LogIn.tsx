import React from 'react';
import { Form, Col, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { apiUrl } from '../../lib/API';
import { getFormAttributes } from '../../util/funcs';
import { UseInput } from '../hooks/useInput';
import { loginInput } from './inputs';
import { loginForm } from './forms/loginForm';
import axios from 'axios';
import { getUsersAction, setTokenAction } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import './styles.scss';
import { LogInResponse } from '../../redux/interfaces';
import { FormControlSize, LoginInput } from './interfaces';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const { input, handleChange } = UseInput<LoginInput>(loginInput);

  const loginData: LoginInput = {
    email: input.email,
    password: input.password,
  };

  async function login(e: any): Promise<void> {
    e.preventDefault();
    try {
      const { data } = await axios.post<LogInResponse>(
        `${apiUrl}/sessions`,
        loginData
      );

      if (data) {
        setLoading(true);
        const { accessToken, refreshToken } = data;
        dispatch(setTokenAction({ accessToken, refreshToken }));

        setTimeout(() => {
          setLoading(false);
          navigate('/home');
          dispatch(getUsersAction);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError(true);
      triggerError();
    }
  }

  const triggerError = () => {
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div id="loginContainer" className="col3">
      <div className="text-center createAcc textColor">Login to LexySpace</div>
      <Col sm={6} md={4} lg={5} className="customMT mx-auto">
        {error && (
          <Alert className="alert text-center" variant="danger">
            Email or password is incorrect!
          </Alert>
        )}

        <Form onSubmit={login}>
          {getFormAttributes(input, loginForm).map((item) => (
            <Form.Group
              key={item.name}
              className="format"
              controlId="formBasicPassword"
            >
              <Form.Control
                className={'login'}
                size={FormControlSize.LG}
                type={item.type}
                name={item.name}
                value={item.value}
                placeholder={item.placeholder}
                onChange={handleChange}
                isInvalid={!!item.name}
              />
              <Form.Control.Feedback className="FeedBack" type="invalid">
                {item.name}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          <div className="loginBtn">
            {input.password.length < 5 ? (
              <Button
                variant="primary"
                disabled
                className="disabled1"
                type="submit"
              >
                Log in
              </Button>
            ) : (
              <Button variant="primary" className="modal-btn" type="submit">
                Log in
              </Button>
            )}
          </div>
          <Form.Text>
            Don't have an account?{' '}
            <Link className="signin" to="/register">
              <a href="#signUp" className="signUp">
                Sign Up
              </a>
            </Link>
          </Form.Text>
        </Form>
      </Col>
    </div>
  );
};

export default LogIn;
