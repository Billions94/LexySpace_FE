import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../../../lib/API';
import { getUsersAction } from '../../../redux/actions';
import { ReduxState } from '../../../redux/interfaces';
import Loader from '../../loader/Loader';
import { ToastContainer, toast } from 'react-toastify';

const CloseAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.data);
  const [text, setText] = React.useState('');
  const [radioValue, setRadioValue] = React.useState('');
  const radios = document.getElementsByName('radio');
  const check = text.length > 0;

  function handleChange({ target }: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(target.value);
  }

  radios.forEach((btn: any) => {
    btn.addEventListener('click', () => {
      if (btn.checked) {
        setRadioValue(btn.value);
      }
    });
  });

  const deleteUserProfile = async () => {
    try {
      const { data } = await API.delete('/users/me', {
        data: check ? { reason: text } : { reason: radioValue },
      });
      if (data) {
        toast.success('Account deleted!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        sessionStorage.clear();
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <Row id="closeAccount" className="justify-content-center mt-5">
      <>
        {user ? (
          <Col xs={4} sm={4} md={7}>
            <div className="mt-5">
              <h4 className="text-white">
                {user.firstName} {user.lastName}, we are sorry to see you leave
                😔
              </h4>
              <p className="text-white">
                are you sure you want to close your Account ?
              </p>
            </div>
            <div className="mt-5">
              <h5 className="text-white">
                tell us why you are closing your account:
              </h5>
              <Form className="mt-3">
                <input
                  type="radio"
                  id="age1"
                  name="radio"
                  value="Need time away from social media"
                />
                <label htmlFor="age1" className="ml-1 text-muted">
                  {' '}
                  Need time away from social media
                </label>
                <br />
                <input
                  type="radio"
                  id="age2"
                  name="radio"
                  value="Too distracting"
                />
                <label htmlFor="age2" className="ml-1 text-muted">
                  {' '}
                  Too distracting
                </label>
                <br />
                <input type="radio" id="age3" name="radio" value="Other" />
                <label htmlFor="age3" className="ml-1 text-muted">
                  {' '}
                  Other
                </label>
                <br />
                <br />
                <textarea
                  className="form-control"
                  rows={4}
                  value={text}
                  onChange={handleChange}
                />
                <a href={`/settings`}>
                  <Button className="submitBtn mt-3">back to Settings</Button>
                </a>
                <Button
                  className="submitBtn mt-3 ml-2"
                  onClick={deleteUserProfile}
                >
                  submit
                </Button>
              </Form>
            </div>
          </Col>
        ) : (
          <>
            <Loader />
            <ToastContainer />
          </>
        )}
      </>
    </Row>
  );
};

export default CloseAccount;
