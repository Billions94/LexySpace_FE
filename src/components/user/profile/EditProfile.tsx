import { Modal, Form, Button } from "react-bootstrap";
import { useState, Dispatch, SetStateAction, ChangeEvent, FC } from "react";
import API from "../../../lib/API";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../redux/interfaces";


interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  getUser: () => Promise<void>;
}

const EditProfile: FC<Props> = ({ show, setShow, getUser }: Props) => {
  const handleClose = () => setShow(false);
  const { user } = useSelector((state: ReduxState) => state.data);

  const [input, setInput] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    bio: user.bio,
    location: user.location,
  });

  async function edit() {
    try {
      const { data } = await API.patch(`/users/me`, input);

      if (data) {
        setShow(false);
        getUser();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function updateInput(key: string, value: string): void {
    setInput({ ...input, [key]: value });
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement> | any,
    value: string
  ): void {
    updateInput(value, e.target.value);
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
          <Modal.Title>edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form">
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label className="text-muted">first Name</Form.Label>
              <Form.Control
                size="lg"
                value={input.firstName}
                onChange={(e) => handleChange(e, "firstName")}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label className="text-muted">last Name</Form.Label>
              <Form.Control
                size="lg"
                value={input.lastName}
                onChange={(e) => handleChange(e, "lastName")}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label className="text-muted">userName</Form.Label>
              <Form.Control
                size="lg"
                value={input.userName}
                onChange={(e) => handleChange(e, "userName")}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label className="text-muted">bio</Form.Label>
              <Form.Control
                size="lg"
                as="textarea"
                value={input.bio}
                onChange={(e) => handleChange(e, "bio")}
              />
            </Form.Group>
            <Form.Group controlId="blog-form" className="mt-3">
              <Form.Label className="text-muted">location</Form.Label>
              <Form.Control
                size="lg"
                value={input.location}
                onChange={(e) => handleChange(e, "location")}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {!user.firstName &&
          !user.lastName &&
          !user.userName &&
          !user.bio &&
          !user.location ? (
            <Button
              size="lg"
              disabled
              className="modal-btn"
              variant="primary"
              style={{ fontSize: "15px" }}
            >
              update
            </Button>
          ) : (
            <Button
              size="lg"
              className="modal-btn"
              variant="primary"
              style={{ fontSize: "15px" }}
              onClick={() => edit()}
            >
              update
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditProfile;
