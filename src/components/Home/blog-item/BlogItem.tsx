import { useState } from "react";
import { Card, Badge, Dropdown, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comment, User } from "../../../redux/interfaces";
import { ReduxState } from "../../../redux/interfaces";
import SharePost from "../blog-home/new/SharePost";
import Edit from "../blog-home/new/EditPost";
import { likeAction, reRouteAction } from "../../../redux/actions";
import "./styles.scss";
import PostAuthor from "../../post/author/PostAuthor";
import DeleteModal from "../../post/crud/DeleteModal";
import CommentModal from "../../comment/new/CommentModal";

interface BlogItemProps {
  text: string;
  // cover: string
  media: string;
  comments: Comment[];
  user: User;
  _id: string;
  likes: User[];
  createdAt: Date;
  getData: () => Promise<void>;
}

const BlogItem = ({
  text,
  media,
  comments,
  user,
  _id,
  likes,
  createdAt,
  getData,
}: BlogItemProps) => {
  // console.log('i am the author', user.userName)

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_GET_URL;
  const dispatch = useDispatch();
  const posts = useSelector((state: ReduxState) => state.posts);
  const newUser = useSelector((state: ReduxState) => state.data.user);
  const me = newUser!._id;

  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [share, setShare] = useState(false);
  const [reload, setReload] = useState(false);

  // for interaction icons label
  const [commentLabel, setCommentLabel] = useState(false);
  const [likeLabel, setLikeLabel] = useState(false);
  const [shareLabel, setShareLabel] = useState(false);

  const handleCommentLabelShow = () => setCommentLabel(true);
  const handleLikeLabelShow = () => setLikeLabel(true);
  const handleShareLabelShow = () => setShareLabel(true);

  const handleCommentLabelClose = () => setCommentLabel(false);
  const handleLikeLabelClose = () => setLikeLabel(false);
  const handleShareLabelClose = () => setShareLabel(false);

  let newPost = posts.find((p) => p._id === _id);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShareShow = () => setShare(true);

  const liker = { userId: newUser!._id };

  const toggle = () => {
    !likes ? likePost() : unLikePost();
  };

  const likePost = () => {
    like();
    dispatch(likeAction());
  };

  const unLikePost = () => {
    like();
    dispatch(likeAction());
  };

  const like = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${apiUrl}/posts/${_id}/likes`, {
        method: "PATCH",
        body: JSON.stringify(liker),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        getData();
        console.log("You liked this post", data);
        console.log(liker);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBlogPost = async (id: string | undefined) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getData();
      }
    } catch (error) {
      console.log("ooops we encountered an error", error);
    }
  };

  const doSomething = (id: string | undefined) => {
    navigate(`/posts/${id}`);
    dispatch(reRouteAction(true));
  };

  const route = (id: string | undefined) => {
    navigate(`/posts/${id}`);
    dispatch(reRouteAction(true));
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ border: "1px solid rgb(216, 215, 215)" }}
        key={_id}
        className="blog-card"
      >
        <div
          className="authorinfo d-flex "
          style={{ justifyContent: "space-between" }}
        >
          <PostAuthor {...user} createdAt={createdAt} />
          <Dropdown className="dropdowntext ml-auto">
            <Dropdown.Toggle className="btn btn-dark dropdownbtn">
              <div className="text-muted dots">
                <b>
                  <strong>•••</strong>
                </b>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdownmenu">
              <a href={`${apiUrl}/posts/${_id}/downloadPDF`}>
                <div className="d-flex customLinks">
                  <div className="mr-3">
                    <img
                      alt=""
                      className="lrdimg"
                      width="17px"
                      src="https://img.icons8.com/ios-filled/50/ffffff/circled-down.png"
                    />
                  </div>
                  <div>download pdf</div>
                </div>
              </a>
              {user!._id !== me ? null : (
                <>
                  <Edit id={_id} refresh={reload} setRefresh={setReload} />
                  <div className="d-flex customLinks">
                    <div className="mr-3">
                      <img
                        alt=""
                        className="lrdimg"
                        width="17px"
                        src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                      />
                    </div>
                    <div onClick={() => setSmShow(true)}>delete</div>
                  </div>
                  <DeleteModal
                    postId={_id}
                    smShow={smShow}
                    setSmShow={setSmShow}
                  />
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div onClick={() => doSomething(_id)} className="blog-link">
          <div className="d-flex postBody">
            <div>
              <h6>{text}</h6>
              <div>
                {!media
                  ? null
                  : media &&
                    media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                      <h6>
                        {" "}
                        <img src={media} className="blog-cover" alt="" />
                      </h6>
                    )}
                {!media
                  ? null
                  : media &&
                    media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`mp4|MPEG-4|mkv`) && (
                      <video
                        src={media}
                        className="blog-video"
                        controls
                        autoPlay
                        muted
                      ></video>
                    )}
              </div>
            </div>
          </div>
          {/* <div className="d-flex postBody">
          </div> */}
        </div>
        {newPost!.sharedPost && newPost!.sharedPost!._id !== _id ? (
          <div className="sharePostDiv">
            <div className="sharePost pt-3">
              <div className="d-flex">
                <PostAuthor {...user} /> <div></div>
              </div>
              <div onClick={() => route(_id)} className="blog-link">
                <Card.Title>{newPost!.sharedPost.text}</Card.Title>
                {!newPost?.sharedPost!
                  ? null
                  : newPost!.sharedPost.media &&
                    newPost!.sharedPost.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`heic|png|jpg|pdf|jpeg`) && (
                      <Card.Img
                        variant="top"
                        src={newPost!.sharedPost.media}
                        className="blog-cover"
                      />
                    )}
                {!newPost?.sharedPost!
                  ? null
                  : newPost!.sharedPost.media &&
                    newPost!.sharedPost.media
                      .split(".")
                      .slice(-1)
                      .join()
                      .match(`mp4|MPEG-4|mkv`) && (
                      <video
                        src={newPost!.sharedPost.media}
                        className="blog-video"
                        controls
                        autoPlay
                        muted
                      ></video>
                    )}
                <Card.Body className="mb-0"></Card.Body>
              </div>
            </div>
          </div>
        ) : null}
        <div className="d-flex justify-content-around mt-1 mb-0">
          <div
            onMouseEnter={handleCommentLabelShow}
            onMouseLeave={handleCommentLabelClose}
            className="postition-relative"
          >
            <button className="candl" onClick={handleShow}>
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/comment-discussion.png"
                width="20px"
                alt=""
              />
            </button>
            <button className="text-dark btnX">
              <span>{comments.length}</span>
            </button>
            {commentLabel === false ? null : (
              <Badge pill variant="secondary" className="interactionBadge">
                Comment
              </Badge>
            )}
            <CommentModal
              id={_id}
              show={show}
              setShow={setShow}
              handleClose={handleClose}
            />
          </div>
          <div
            onMouseEnter={handleLikeLabelShow}
            onMouseLeave={handleLikeLabelClose}
            onClick={() => toggle()}
            className="postition-relative"
          >
            {!likes.some((elem) => elem._id === me) ? (
              <>
                <button className="candl">
                  <img
                    className="interactions"
                    src="https://img.icons8.com/ios-filled/50/ffffff/two-hearts.png"
                    width="20px"
                    alt=""
                  />
                </button>
                <button className="text-dark btnX">
                  <span>{likes.length}</span>
                </button>
                {likeLabel === false ? null : (
                  <Badge pill variant="secondary" className="interactionBadge">
                    Like
                  </Badge>
                )}
              </>
            ) : (
              <>
                <button className="candl">
                  <img
                    className="interactions"
                    src="https://img.icons8.com/color/50/ffffff/two-hearts.png"
                    width="20px"
                    alt=""
                  />
                </button>
                <button className="text-dark btnX">
                  <span>{likes.length}</span>
                </button>
                {likeLabel === false ? null : (
                  <Badge pill variant="secondary" className="interactionBadge">
                    Like
                  </Badge>
                )}
              </>
            )}
          </div>
          <div
            onMouseEnter={handleShareLabelShow}
            onMouseLeave={handleShareLabelClose}
            className="postition-relative"
          >
            <button className="candl" onClick={handleShareShow}>
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/right2.png"
                width="20px"
                alt=""
              />
            </button>
            {shareLabel === false ? null : (
              <Badge pill variant="secondary" className="interactionBadge">
                Share
              </Badge>
            )}
            <SharePost
              id={_id}
              user={user}
              show={share}
              setShow={setShare}
              createdAt={createdAt}
            />
          </div>
        </div>
      </ListGroup.Item>
    </ListGroup>
  );
};

export default BlogItem;
