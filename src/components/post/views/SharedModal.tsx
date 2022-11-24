import {
  useState,
  createRef,
  Dispatch,
  SetStateAction,
  useEffect,
  FC,
} from "react";
import { Modal, Button, Form, Card } from "react-bootstrap";
import { ReduxState, Post, User } from "../../../redux/interfaces";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BlogAuthor from "../author/PostAuthor";
import { getPosts, reRouteAction } from "../../../redux/actions";

interface Props {
  id: string | undefined;
  user: User;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  createdAt: Date | undefined;
}

const ShareModal: FC<Props> = ({
  id,
  user,
  show,
  setShow,
  createdAt,
}: Props) => {
  const apiUrl = process.env.REACT_APP_GET_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state: ReduxState) => state.posts);
  const loggedInUser = useSelector((state: ReduxState) => state.data.user);
  const userName = loggedInUser!.userName;
  const sharePostBody = posts.find((p) => p._id === id);

  const [post, setPost] = useState({
    text: "",
    sharedPost: sharePostBody!,
  });

  const [media, setMedia] = useState("");
  const handleClose = () => setShow(false);

  const target = (e: any) => {
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
  };

  const sharePost = async () => {
    if (media) {
      try {
        const response = await fetch(`${apiUrl}/posts/${userName}`, {
          method: "POST",
          body: JSON.stringify(post),
          headers: { "Content-Type": "application" },
        });
        if (response.ok) {
          const data: Post = await response.json();
          const postId = data._id;
          try {
            const formDt = new FormData();
            formDt.append("media", media);
            const uploadCover = await fetch(
              `${apiUrl}/posts/${postId}/upload`,
              {
                method: "PATCH",
                body: formDt,
              }
            );
            if (uploadCover.ok) {
              dispatch(reRouteAction(false));
              setShow(false);
              navigate("/home");
              dispatch(getPosts());
            } else throw new Error("File could not be uploaded");
          } catch (error) {
            console.log(error);
          }
        } else {
          throw new Error("Unable to share post");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}/posts/${userName}`, {
          method: "POST",
          body: JSON.stringify(post),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setShow(false);
          dispatch(reRouteAction(false));
          navigate("/home");
          dispatch(getPosts());
        }
      } catch (error) {}
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <>
      <Modal
        id="shareModal"
        size="lg"
        centered
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img
                src={loggedInUser!.image}
                alt=""
                className="roundpic"
                width={47}
                height={47}
              />
            </div>
            <div className="ml-2 userInfo">
              <span>
                {loggedInUser!.firstName} {loggedInUser!.lastName}
                {loggedInUser!.isVerified === true && (
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
              placeholder="start typing...."
              as="textarea"
              className="textarea"
              rows={5}
              value={post.text}
              onChange={(e) => setPost({ ...post, text: e.target.value })}
            />
          </Form.Group>
          <div className="sharePostDiv">
            <div className="sharePost">
              <div
                className="authorinfo d-flex "
                style={{ justifyContent: "space-between" }}
              >
                <BlogAuthor {...user} createdAt={createdAt} />
              </div>
              <Link to={`/posts/${post.sharedPost._id}`} className="blog-link">
                <Card.Title>{post.sharedPost.text}</Card.Title>
                {!post.sharedPost.media
                  ? null
                  : post.sharedPost.media &&
                    post?.sharedPost.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`heic|png|jpg|pdf|jpeg`) && (
                      <Card.Img
                        variant="top"
                        src={post.sharedPost.media}
                        className="blog-cover"
                      />
                    )}
                {!post.sharedPost.media
                  ? null
                  : post.sharedPost.media &&
                    post?.sharedPost.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`mp4|MPEG-4|mkv`) && (
                      <video
                        src={post.sharedPost.media}
                        className="blog-video"
                        controls
                        autoPlay
                        muted
                      ></video>
                    )}
                <Card.Body className="mb-0"></Card.Body>
              </Link>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="mt-0">
          <div className="inputbtn">
            <input
              type="file"
              ref={inputBtn}
              className="d-none"
              onChange={(e) => target(e)}
            />
            <svg
              onClick={openInputFile}
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
          </div>
          {!post.text ? (
            <Button
              variant="primary"
              disabled
              className="btn btn-md modal-btn"
              onClick={() => sharePost()}
            >
              post
            </Button>
          ) : (
            <Button
              variant="primary"
              className="btn btn-md modal-btn"
              onClick={() => sharePost()}
            >
              post
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareModal;
