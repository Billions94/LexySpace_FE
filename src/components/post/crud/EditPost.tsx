import { useState, createRef, Dispatch, SetStateAction, FC } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import useAuthGuard from "../../../lib/index";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../../../redux/interfaces";
import { updatePost } from "../../../lib/requests/post";
import "./styles.scss";

interface Props {
  data: {
    postId: string;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
  };
}

const Edit: FC<Props> = ({ data }: Props) => {
  useAuthGuard();

  const { postId, reload, setReload } = data;

  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [media, setMedia] = useState<string>("");
  const [post, setPost] = useState({ text: "" });
  const { user } = useSelector((state: ReduxState) => state.data);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const target = (e: any) => {
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
  };

  const updatePostData = {
    post,
    media,
    setMedia,
    postId,
    setShow,
    dispatch,
    refresh: reload,
    setRefresh: setReload,
  };

  return (
    <Container className="new-blog-container p-0 mb-0 mt-0">
      <div className="d-flex customLinks" style={{ paddingTop: "-110px" }}>
        <div style={{ cursor: "pointer" }}>
          <img
            alt=""
            className="lrdimg"
            width="17px"
            src="https://img.icons8.com/ios-filled/50/ffffff/edit--v1.png"
          />
        </div>

        <div className="primary" onClick={handleShow}>
          <div style={{ marginLeft: "15px" }}>
            <span>edit</span>
          </div>
        </div>

        <Modal
          id="postModal"
          centered
          className="px-4"
          animation={true}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>edit Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex userInfoContainer">
              <div>
                <img src={user!.image} alt="" className="roundpic" width={47} />
              </div>
              <div className="ml-2 userInfo">
                <span>
                  {user!.firstName} {user!.lastName}
                  {user!.isVerified === true && (
                    <span className=" mt-1 ml-1  d-flex-row align-items-center">
                      <img
                        alt=""
                        className="mr-2"
                        width="15"
                        src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"
                      />
                    </span>
                  )}
                </span>
              </div>
            </div>
            <Form.Group controlId="blog-content" className="form1 mt-3">
              <Form.Control
                placeholder="wanna change something?"
                as="textarea"
                className="textarea"
                rows={5}
                value={post.text}
                onChange={(e) => setPost({ ...post, text: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button onClick={openInputFile} className="btn btn-sm btnIcon">
                <input
                  type="file"
                  ref={inputBtn}
                  className="d-none"
                  onChange={(e) => target(e)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="27"
                  fill="#f91880"
                  className="bi bi-card-image"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                </svg>
              </button>
            </div>
            {!post.text ? (
              <Button
                variant="primary"
                disabled
                className="btn btn-md modal-btn"
                onClick={() => updatePost(updatePostData)}
              >
                update
              </Button>
            ) : (
              <Button
                variant="primary"
                className="btn btn-md modal-btn"
                onClick={() => updatePost(updatePostData)}
              >
                update
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};
export default Edit;
