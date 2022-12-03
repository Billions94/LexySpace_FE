import {
  createRef,
  useState,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxState } from "../../redux/interfaces";
import { Row, Image, Form, Button, Col } from "react-bootstrap";
import Picker from "emoji-picker-react";
import { loadingNew } from "../../assets/icons";
import { useAddPostMutation } from "../../dto";
import { gql } from "@apollo/client";
import { handleFileChange } from "../../lib";
import upload from "../upload/upload";

interface PostContainerProps {
  fetchLoading: boolean;
  setFetchLoading: Dispatch<SetStateAction<boolean>>;
}

const initialInputState = {
  content: "",
  media: "",
};

const PostContainer = ({
  fetchLoading,
  setFetchLoading,
}: PostContainerProps) => {
  const { user } = useSelector((state: ReduxState) => state.data);

  const [input, setInput] = useState(initialInputState);
  const [show, setShow] = useState(false);

  const [emoji, setEmoji] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);

  const [addPost, { loading }] = useAddPostMutation({
    update(cache, { data: addPost }) {
      cache.modify({
        fields: {
          posts(existingPosts = []) {
            const newPostRef = cache.writeFragment({
              data: addPost?.addPost,
              fragment: gql`
                fragment NewPost on Post {
                  author {
                    id
                  }
                  comments {
                    content
                    media
                    postId
                    id
                    author {
                      id
                    }
                  }
                  content
                  id
                  media
                  likes {
                    id
                  }
                  createdAt
                }
              `,
            });
            return [...existingPosts, newPostRef];
          },
        },
      });
    },
  });

  const toggleEmoji = () => {
    showEmoji === false ? setShowEmoji(true) : setShowEmoji(false);
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEmojiShow = () => setEmoji(true);
  const handleEmojiClose = () => setEmoji(false);

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
  };

  const [chosenEmoji, setChosenEmoji] = useState("");

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  function updateInput(key: string, value: string) {
    setInput({ ...input, [key]: value });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | any>,
    key: string
  ) => {
    updateInput(key, e.target.value);
  };

  async function createPost(e: any) {
    e.preventDefault();
    try {
      if (input.media.length > 0) {
        const { url } = await upload(e);
        if (url) {
          input.media = url;
          await addPost({ variables: { input: input } });

          setInput(initialInputState);
          setShow(false);

          setTimeout(() => {
            setFetchLoading && setFetchLoading(false);
          }, 1000);
        }
      }

      if (!input.media) {
        await addPost({ variables: { input: input } });

        setInput(initialInputState);
        setShow(false);

        setTimeout(() => {
          setFetchLoading && setFetchLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      createPost(e);
    }
  };

  return (
    <Row id="Row" className="justify-content-center mb-0">
      <Col className="col">
        <div className="postContainer">
          <div className="userImage">
            <Link to={`/userProfile/${user._id}`}>
              <img
                src={user.image}
                alt=""
                className="img"
                width="47"
                height="47"
              />
            </Link>
          </div>
          <Form className="p-2 w-100" onSubmit={(e) => createPost(e)}>
            <div className="textareaborder">
              <Form.Control
                as={"textarea"}
                className="form-control textarea"
                rows={2}
                placeholder="start typing to share your thoughts...."
                value={input.content}
                onKeyPress={(e: any) => handleKeyboardEvent(e)}
                onChange={(e) => handleChange(e, "content")}
              />
            </div>
            <div className="d-flex sharebtn">
              <div>
                <div className="relative">
                  <button
                    onMouseEnter={handleShow}
                    onMouseLeave={handleClose}
                    onClick={openInputFile}
                    className="btn btn-sm btnIcon"
                  >
                    <Form.Control
                      type="file"
                      ref={inputBtn}
                      className="d-none"
                      name="file"
                      onChange={(e) => handleFileChange(e, input, setInput)}
                    />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="#f91880"
                      className="bi bi-card-image"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                    </svg>
                  </button>
                  {show === false ? null : (
                    <div className="absolute">
                      <span className="badge text-muted">Media</span>
                    </div>
                  )}
                </div>
                {/* <div className="relative">
                  <button
                    onMouseEnter={handleEmojiShow}
                    onMouseLeave={handleEmojiClose}
                    className="btn btn-sm btnIcon"
                  >
                    <svg
                      onClick={() => toggleEmoji()}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="#f91880"
                      className="bi bi-emoji-smile"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                    </svg>
                  </button>
                  {emoji === false ? null : (
                    <div className="absolute">
                      <span className="badge text-muted">Emojis</span>
                    </div>
                  )}
                </div> */}

                {showEmoji === false ? null : (
                  <div style={{ zIndex: "10px" }}>
                    <Picker
                      onEmojiClick={onEmojiClick}
                      pickerStyle={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
              <div className="mar-top clearfix mt-2 ml-auto">
                {!input.content ? (
                  <button disabled className="btn btn-md disabled1">
                    <i className="fa fa-pencil fa-fw" /> Post
                  </button>
                ) : (
                  <button className="btn btn-md modal-btn" type="submit">
                    <i className="fa fa-pencil fa-fw" /> Post
                  </button>
                )}
              </div>
            </div>
          </Form>
          <>
            {fetchLoading === true && (
              <Image
                className="text-center"
                src={loadingNew}
                alt="loading new"
                width="40px"
                height="40px"
              />
            )}
          </>
        </div>
      </Col>
    </Row>
  );
};

export default PostContainer;
