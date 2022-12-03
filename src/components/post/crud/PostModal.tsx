import { useState, Dispatch, SetStateAction, createRef } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import useAuthGuard, { handleFileChange } from "../../../lib/index";
import { ReduxState } from "../../../redux/interfaces";
import { useAddPostMutation } from "../../../dto";
import { gql } from "@apollo/client";
import "./styles.scss";
import upload from "../../upload/upload";

interface PostModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const initialInputState = {
  content: "",
  media: "",
};

const PostModal = ({ show, setShow }: PostModalProps) => {
  useAuthGuard();

  const { user } = useSelector((state: ReduxState) => state.data);

  const handleClose = () => setShow(false);
  const [input, setInput] = useState(initialInputState);

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

  function updateInput(key: string, value: string) {
    setInput({ ...input, [key]: value });
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | any>,
    key: string
  ) => {
    updateInput(key, e.target.value);
  };

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
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
        }
      }

      if (!input.media) {
        await addPost({ variables: { input: input } });

        setInput(initialInputState);
        setShow(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Modal
        id="postModal"
        centered
        show={show}
        onHide={handleClose}
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>start A Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex userInfoContainer">
            <div>
              <img
                src={user!.image}
                alt=""
                className="roundpic"
                width={47}
                height={47}
              />
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
              placeholder="what's poppin?"
              as="textarea" 
              className="textarea"
              rows={5}
              value={input.content}
              onChange={(e) => handleChange(e, "content")}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="mt-0">
          <div>
            <button onClick={openInputFile} className="btn btn-sm btnIcon">
              <input
                type="file"
                ref={inputBtn}
                className="d-none"
                onChange={(e) => handleFileChange(e, input, setInput)}
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
          {!input.content ? (
            <Button
              variant="primary"
              disabled
              className="btn btn-md modal-btn"
              onClick={(e) => createPost(e)}
            >
              post
            </Button>
          ) : (
            <Button
              variant="primary"
              className="btn btn-md modal-btn"
              onClick={(e) => createPost(e)}
            >
              post
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PostModal;
