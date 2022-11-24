import { createRef, useState, FC } from "react";
import API from "../../../lib/API";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { SET_COVER } from "../../../redux/actions";
import { ReduxState } from "../../../redux/interfaces";
import edit from "../../../assets/edit.png"


interface Props {
  getUser: () => Promise<void>;
}

const Cover: FC<Props> = ({ getUser }: Props) => {
  const dispatch = useDispatch();
  const profileCover = useSelector((state: ReduxState) => state.data.cover);
  const [show, setShow] = useState<boolean>(false);
  const [cover, setCover] = useState<string>("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function inputFile(e: any) {
    if (e.target && e.target.files[0]) {
      setCover(e.target.files[0]);
    }
  }

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
  };

  async function newCover() {
    try {
      const formData = new FormData();
      formData.append("cover", cover);

      const { data } = await API.post(`/users/me/cover`, formData);
      if (data) {
        dispatch({
          type: SET_COVER,
          payload: data.cover,
        });
        setShow(false);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Button
        variant="primary"
        className="btn btn-sm coverUpdateBtn"
        onClick={handleShow}
      >
        <img
          src={edit}
          className="img"
          alt=""
          width={27}
        />
      </Button>

      <Modal id="coverModal" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update cover</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="imgWrapper">
            <img
              className="profile-pic"
              src={profileCover}
              alt="imag"
              width="430px"
              height="430px"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={openInputFile} className="btn btn-sm btnIcon">
            <input
              type="file"
              ref={inputBtn}
              className="d-none"
              onChange={(e) => inputFile(e)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="#f91880"
              className="bi bi-card-image"
              viewBox="0 0 16 16"
            >
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
            </svg>
          </button>
          <Button
            variant="primary"
            onClick={() => newCover()}
            className="ml-auto modal-btn"
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Cover;
