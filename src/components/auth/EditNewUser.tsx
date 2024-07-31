import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useAuthGuard from '../../lib';
import API from '../../lib/API';
import { getUsersAction, saveUserAction } from '../../redux/actions';
import { ReduxState } from '../../redux/interfaces';
import { getFormAttributes } from '../../util/funcs';
import { useInput } from '../hooks/useInput';
import Loader from '../loader/Loader';
import { editNewUserForm } from './forms/editNewUserForm';
import { newUserInput } from './inputs';
import { FormControlSize, NewUserInput } from './interfaces';

const EditNewUser: React.FC = () => {
  useAuthGuard();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { input, handleChange, resetInput } =
    useInput<NewUserInput>(newUserInput);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<string>('');
  const { user } = useSelector((state: ReduxState) => state.data);

  const target = (e: any) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
      setAlert(true);

      setTimeout(() => {
        setAlert(false);
      }, 3000);

      const fmDT = new FormData();
      fmDT.append('image', e.target.files[0]);

      API.patch('/users/me/profilePic', fmDT).catch((err) => console.log(err));
    }
  };

  const inputBtn = React.createRef<HTMLInputElement>();

  const openInputFile = () => inputBtn?.current?.click();

  async function saveUser(user: any): Promise<void> {
    localStorage.setItem('user', user);
    const userFromLocalStorage = localStorage.getItem('user');

    dispatch(saveUserAction(userFromLocalStorage ?? user));
    localStorage.removeItem('user');
  }

  async function submit(e: any): Promise<void> {
    e.preventDefault();
    if (image.length > 0) {
      const formData = new FormData();
      formData.append('firstName', input.firstName);
      formData.append('lastName', input.lastName);
      formData.append('bio', input.bio);
      formData.append('location', input.location);
      formData.append('image', image);

      try {
        const { data } = await API.patch(`/users/me`, formData);
        await saveUser(data.user);

        if (data) {
          resetInput();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate('/home');
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const { data } = await API.patch(`/users/me`, input);

        if (data) {
          resetInput();
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            navigate('/home');
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  React.useEffect(() => {
    dispatch(getUsersAction());
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Row id="newUserDiv" className="justify-content-center">
      <Col className="" md={6} lg={5}>
        <div className="welcome1 text-center mb-3">
          Edit your User Profile{' '}
          <img
            src="https://img.icons8.com/fluency/50/ffffff/user-male-circle.png"
            alt=""
            height="48px"
            width="48px"
          />
        </div>
        {!loading ? (
          <Form noValidate className="newUserForm" onSubmit={submit}>
            {alert ? (
              <div className="text-center">
                <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/35771931234507.564a1d2403b3a.gif"
                  height="38px"
                  width="38px"
                  alt=""
                />
              </div>
            ) : (
              <div className="text-center">
                <button
                  type="button"
                  onClick={openInputFile}
                  className="btn btn-lg btnIcon"
                >
                  <input
                    type="file"
                    ref={inputBtn}
                    className="d-none"
                    onChange={target}
                  />
                  <img
                    src={
                      user?.image
                        ? user.image
                        : 'https://img.icons8.com/fluency/50/ffffff/user-male-circle.png'
                    }
                    alt=""
                    height="38px"
                    width="38px"
                  />
                  <div className="addPhoto">Add image</div>
                </button>
              </div>
            )}
            {getFormAttributes(input, editNewUserForm).map((form) => (
              <Form.Group key={form.name} controlId="blog-form" className="">
                <Form.Label className="text-muted">
                  {form.placeholder}
                </Form.Label>
                <Form.Control
                  className="newUserFormControl"
                  size={FormControlSize.LG}
                  name={form.name}
                  placeholder={form.placeholder}
                  value={form.value}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
            <div className="d-flex">
              <></>
              {!input.firstName &&
              !input.lastName &&
              !input.location &&
              !input.bio ? (
                <Button
                  variant="submit"
                  type="button"
                  className="btn btn-md modal-btn disabled1"
                  disabled
                >
                  submit
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-md modal-btn"
                >
                  submit
                </Button>
              )}
            </div>
          </Form>
        ) : (
          <Loader />
        )}
      </Col>
    </Row>
  );
};

export default EditNewUser;
