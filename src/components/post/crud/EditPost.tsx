import React, {
  createRef,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { InputSVG } from '../../../assets/svg/inputSVG';
import { Verified } from '../../../assets/svg/verified';
import useAuthGuard from '../../../lib/index';
import { updatePost } from '../../../lib/requests/post';
import { ReduxState } from '../../../redux/interfaces';
import './styles.scss';

interface Props {
  data: {
    postId?: string;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
  };
}

const Edit: FC<Props> = ({ data: { postId, reload, setReload } }) => {
  useAuthGuard();
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  const [media, setMedia] = useState<string>('');
  const [post, setPost] = useState({ text: '' });
  const { user } = useSelector((state: ReduxState) => state['data']);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn?.current?.click();
  };

  const updatePostData = {
    post,
    media,
    setMedia,
    postId: postId as string,
    setShow,
    dispatch,
    refresh: reload,
    setRefresh: setReload,
  };

  const target = (e: any) => {
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  return (
    <Container className="new-blog-container p-0 mb-0 mt-0">
      <div className="d-flex customLinks" style={{ paddingTop: '-110px' }}>
        <div style={{ cursor: 'pointer' }}>
          <img
            alt=""
            className="lrdimg"
            width="17px"
            src="https://img.icons8.com/ios-filled/50/ffffff/edit--v1.png"
          />
        </div>

        <div className="primary" onClick={handleShow}>
          <div style={{ marginLeft: '15px' }}>
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
                <LazyLoadImage
                  src={user?.image}
                  alt=""
                  className="roundpic"
                  width={47}
                />
              </div>
              <div className="ml-2 userInfo">
                <span>
                  {user?.firstName} {user?.lastName}
                  {user?.isVerified && (
                    <span className=" mt-1 ml-1  d-flex-row align-items-center">
                      {Verified}
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
                {InputSVG}
              </button>
            </div>
            {!post.text ? (
              <Button
                variant="primary"
                disabled
                className="btn btn-md modal-btn"
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
