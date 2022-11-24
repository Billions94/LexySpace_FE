import { Dropdown, Form, Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, createRef } from "react";
import { Link } from "react-router-dom";
import { postTimer } from "../../../lib";
import {
  Comments,
  Posts,
  ReduxState,
  Replies,
} from "../../../redux/interfaces";
import Reply from "./blog-reply/Reply";
import { defaultAvatar } from "../../../redux/store";
import Picker from "emoji-picker-react";

interface SingleCommentProps {
  id: string | undefined;
  blog: Posts;
  comment: Comments;
  comments: Comments[];
  fetchComments: () => Promise<void>;
}

const SingleComment = ({
  id,
  blog,
  comment,
  comments,
  fetchComments,
}: SingleCommentProps) => {
  const apiUrl = process.env.REACT_APP_GET_URL;
  const [media, setMedia] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useSelector((state: ReduxState) => state.data);
  const me = user!._id;

  const [reply, setReply] = useState({
    text: "",
    user: user!._id,
  });
  const [show, setShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [replies, setReplies] = useState<Replies[]>();

  const toggle = () => {
    show === false ? setShow(true) : setShow(false);
  };

  const target = (e: any) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const replyComment = async (c: Comments) => {
    if (media) {
      try {
        const response = await fetch(`${apiUrl}/replies/${c._id}`, {
          method: "POST",
          body: JSON.stringify(reply),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          const replyData = await response.json();
          const newReply = replyData.replies.pop();
          console.log("this is the reply data", replyData);
          try {
            const formDt = new FormData();
            formDt.append("media", media);
            const addMedia = await fetch(
              `${apiUrl}/replies/${newReply}/upload`,
              {
                method: "PATCH",
                body: formDt,
              }
            );
            if (addMedia.ok) {
              setShow(false);
              getReplies();
              fetchComments();
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log("ooops we encountered an error", error);
      }
    } else {
      try {
        const response = await fetch(`${apiUrl}/replies/${c._id}`, {
          method: "POST",
          body: JSON.stringify(reply),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          setReply({
            text: "",
            user: user!._id,
          });
          setShow(false);
          getReplies();
          fetchComments();
        }
      } catch (error) {
        console.log("ooops we encountered an error", error);
      }
    }
  };

  const getReplies = async () => {
    try {
      const response = await fetch(`${apiUrl}/replies`);
      if (response.ok) {
        const data: Replies[] = await response.json();
        console.log("reply info", data);
        setReplies(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (c: Comments) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}/comments/${c._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.log("ooops we encountered an error", error);
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

  return (
    <div key={comment._id} className="mt-2">
      <div className="cardHeader">
        <div className="d-flex">
          <Link to={`/userProfile/${comment.user._id}`}>
            <div>
              <Image
                className=" d-block g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                src={comment.user.image ? comment.user.image : defaultAvatar}
                alt="Image Description"
              />
            </div>
          </Link>
          <div className="cAndR position-relative">
            <div className="d-flex customBB">
              <div className="text-muted posted mb-2">
                Posted: {postTimer(comment.createdAt)}
              </div>
              {comment.user._id !== me ? null : (
                <Dropdown className="dropdowntext ml-auto">
                  <Dropdown.Toggle className="btn btn-dark dropdownbtn">
                    <div className="text-muted dots">
                      <b>
                        <strong>•••</strong>
                      </b>
                    </div>
                    {/* <img alt=''
                      className="lrdimg"
                      width="15px"
                      src="https://img.icons8.com/android/50/000000/more.png" /> */}
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    className="dropDownMenu"
                    style={{
                      padding: "18px",
                      borderRadius: "25px",
                      border: "1px solid rgb(216, 215, 215)",
                    }}
                  >
                    {/* <Edit /> */}
                    <div className="d-flex customLinks">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="17px"
                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                        />
                      </div>
                      <div onClick={(e) => deleteComment(comment)}>delete</div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="text-dark mb-2 userInfo">
              {comment.user.firstName} {comment.user.lastName}
            </div>
            <div className="commentText">
              <div>{comment.text}</div>
              <div className="mt-2">
                {!comment.media
                  ? null
                  : comment.media &&
                    comment.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`heic|png|jpg|pdf|jpeg`) && (
                      <img className="img" src={comment.media} alt="" />
                    )}
                {!comment.media
                  ? null
                  : comment.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`mp4|MPEG-4|mkv`) && (
                      <video
                        src={comment.media}
                        className="blog-video"
                        controls
                        autoPlay
                        muted
                      ></video>
                    )}
              </div>
            </div>
            <span
              onClick={() => toggle()}
              className={!comment.media ? "replyspan" : "replyspan1"}
            >
              Reply
            </span>
          </div>
        </div>

        <Reply blog={blog} comment={comment} commentID={comment._id} />

        {show === false ? null : (
          <div className="reply">
            <Link to={`/userProfile/${user._id}`}>
              <div className="mt-2">
                <Image
                  roundedCircle
                  src={user.image}
                  alt=""
                  className="d-block rounded-circle g-mt-3 g-mr-15"
                  width={37}
                  height={37}
                />
              </div>
            </Link>

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
                  {!reply.text ? (
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
                      onClick={() => replyComment(comment)}
                    >
                      <i className="fa fa-pencil fa-fw" /> send
                    </button>
                  )}
                </div>
                <Form.Control
                  className="form-control dmText search"
                  placeholder="Write a comment..."
                  value={reply.text}
                  onChange={(e) => setReply({ ...reply, text: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleComment;
