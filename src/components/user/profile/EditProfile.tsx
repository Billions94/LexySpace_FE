import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Dispatch, SetStateAction, FC } from 'react';
import API from '../../../lib/API';
import { useSelector } from 'react-redux';
import { ReduxState } from '../../../redux/interfaces';
import './styles.scss';
import { UseInput } from '../../hooks/useInput';
interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  getUser: () => Promise<void>;
}

const EditProfile: FC<Props> = ({ show, setShow, getUser }: Props) => {
  const handleClose = () => setShow(false);
  const { user } = useSelector((state: ReduxState) => state.data);

  const savedState = {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.username,
    bio: user.bio,
    location: user.location,
  };

  const { input, handleChange } = UseInput(savedState);

  async function edit() {
    try {
      const { data } = await API.patch(`/users/current-user`, input);

      if (data) {
        setShow(false);
        await getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Modal
        id="editModal"
        size="lg"
        centered
        className="px-4"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-profile">edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            {Object.keys(input).map((key) => (
              <Form.Group controlId="blog-form" className="mt-3">
                <Form.Label className="label">{key.toLowerCase()}</Form.Label>
                <Form.Control
                  id="control"
                  size="lg"
                  className="text-white"
                  name={key}
                  value={(input as any)[key]}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!user.firstName &&
          !user.lastName &&
          !user.username &&
          !user.bio &&
          !user.location ? (
            <Button size="lg" disabled className="modal-btn" variant="primary">
              <p>update</p>
            </Button>
          ) : (
            <Button
              size="lg"
              className="modal-btn"
              variant="primary"
              onClick={edit}
            >
              <p>update</p>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfile;
