import { createRef, useEffect, useState, KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { Form, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUsersAction } from "../../../redux/actions/";
import { ReduxState } from "../../../redux/interfaces/";
import Picker from "emoji-picker-react";

interface AddCommentProps {
  id: string | undefined;
  fetchComments: () => Promise<void>;
}

const AddComment = ({ fetchComments, id }: AddCommentProps) => {
  const { user } = useSelector((state: ReduxState) => state.data);

  const userId = user?._id;

  const dispatch = useDispatch();

  const [comments, setComments] = useState({
    text: "",
    user: userId,
  });

  const apiUrl = process.env.REACT_APP_GET_URL;
  const [media, setMedia] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEmoji, setShowEmoji] = useState(false);

  const target = (e: any) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const inputBtn = createRef<HTMLInputElement>();

  const openInputFile = () => {
    inputBtn!.current!.click();
  };

  // Emojis
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setChosenEmoji(emojiObject);
  };

  const postComment = async () => {
    if (media) {
      try {
        const response = await fetch(`${apiUrl}/comments/${id}`, {
          method: "POST",
          body: JSON.stringify(comments),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const commentData = await response.json();
          const newComment = commentData.comments.pop();
          try {
            const formDt = new FormData();
            formDt.append("media", media);
            let addMedia = await fetch(
              `${apiUrl}/comments/${newComment}/upload`,
              {
                method: "PATCH",
                body: formDt,
              }
            );
            if (addMedia.ok) {
              fetchComments();
              setComments({
                text: "",
                user: userId,
              });
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.error("oops with encountered an error ", error);
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}/comments/${id}`, {
          method: "POST",
          body: JSON.stringify(comments),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          fetchComments();
          setComments({
            text: "",
            user: userId,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyboardEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      postComment();
    }
  };

  return (
    <div className="panel mt-4">
      <div className="panel-body d-flex">
        <div>
          <Link to={`/userProfile/${user._id}`}>
            <Image
              roundedCircle
              src={user.image}
              alt=""
              className="d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
              width={47}
              height={47}
            />
          </Link>
        </div>
        <div className="textAreaDm w-100">
          <div id="textArea-container" className="panel-body">
            <svg
              id="input-icon1"
              xmlns="http://www.w3.org/2000/svg"
              width="10px"
              height="10px"
              fill="#f91880"
              className="bi bi-emoji-smile ml-2"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
            </svg>
            {showEmoji === false ? null : (
              <Picker
                onEmojiClick={onEmojiClick}
                pickerStyle={{ width: "100%" }}
              />
            )}
            <div>
              {!comments.text ? (
                <div>
                  <input
                    type="file"
                    ref={inputBtn}
                    className="d-none"
                    onChange={target}
                  />
                  <svg
                    id="input-icon"
                    onClick={openInputFile}
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="18"
                    fill="#f91880"
                    className="bi bi-card-image btn btn-sm uploadicons"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                  </svg>
                </div>
              ) : (
                <button
                  className="btn ml-auto btn-sm sendBtnDm"
                  onClick={(e) => postComment()}
                >
                  <i className="fa fa-pencil fa-fw" /> send
                </button>
              )}
            </div>
            <Form.Control
              className="form-control dmText search"
              placeholder="Write a comment..."
              value={comments.text}
              onKeyPress={handleKeyboardEvent}
              onChange={(e) =>
                setComments({ ...comments, text: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
