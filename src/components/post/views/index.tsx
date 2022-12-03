import {
  Container,
  Dropdown,
  Image,
  Col,
  Badge,
  Button,
  Row,
} from "react-bootstrap";
import { useState, useEffect, Dispatch, SetStateAction, FC } from "react";
import { Comment, ReduxState, IPost } from "../../../redux/interfaces";
import { getPosts, likeAction, reRouteAction } from "../../../redux/actions";
import { useNavigate, Link, useParams } from "react-router-dom";
import useAuthGuard, { postTimer } from "../../../lib/index";
import { useSelector, useDispatch } from "react-redux";
import { defaultAvatar } from "../../../assets/icons";
import CommentComponent from "../../comment/Comment";
import AddComment from "../../comment/new/AddComment";
import Edit from "../crud/EditPost";
import Loader from "../../loader/Loader";
import ShareModal from "./SharedModal";
import ViewModal from "./ViewModal";
import DeleteModal from "../crud/DeleteModal";
import LikesModal from "./LikesModal";
import API from "../../../lib/API";
import {
  GetPostByIdDocument,
  Post,
  useAddPostLikeMutation,
  useGetPostByIdQuery,
  User,
} from "../../../dto";
import "./styles.scss";

const Blog: FC = () => {
  useAuthGuard();

  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);
  const [share, setShare] = useState(false);

  const [display, setDisplay] = useState(false);
  const [timer, setTimer] = useState(false);

  const [view, setView] = useState(false);
  const [open, setOpen] = useState(false);

  const [likeShow, setLikeShow] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleDisplayShow = () =>
    setTimeout(() => {
      setDisplay(true);
    }, 1000);

  const handleDisplayClose = () => {
    {
      setTimeout(() => {
        if (timer === true) {
          setDisplay(false);
          setTimer(false);
        }
      }, 1000);
    }
  };

  const dispatch = useDispatch();
  const { posts } = useSelector((state: ReduxState) => state);
  const { user, reroute } = useSelector((state: ReduxState) => state.data);
  const me = user!._id;
  const liker = { userId: me };

  const newPost = posts.find((p) => p.id === id);
  const post = posts.find((post) => post.id === id);

  const [addPostLike] = useAddPostLikeMutation();

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [commentLabel, setCommentLabel] = useState(false);
  const handleCommentLabelShow = () => setCommentLabel(true);
  const handleCommentLabelClose = () => setCommentLabel(false);

  const [shareLabel, setShareLabel] = useState(false);
  const handleShare = () => setShare(true);
  const handleShareLabelShow = () => setShareLabel(true);
  const handleShareLabelClose = () => setShareLabel(false);

  const [likeLabel, setLikeLabel] = useState(false);
  const handleLikeLabelShow = () => setLikeLabel(true);
  const handleLikeLabelClose = () => setLikeLabel(false);

  const showNHidde = () => {
    show === false ? handleShow() : handleClose();
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get<IPost>(`/comments`);
      if (data) {
        const reverseComments = data.comments.reverse();

        setComments(reverseComments);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const likePost = async (postId: string) => {
    try {
      await addPostLike({ variables: { postId: postId } });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [reroute, post?.likes?.length]);

  function navigateHome() {
    dispatch(reRouteAction(false));
    navigate(-1);
  }

  const updatePostProps = {
    postId: String(post?.id),
    reload: refresh,
    setReload: setRefresh,
    media: String(post?.media),
  };

  return post ? (
    <Row id="indexDiv">
      <Container key={post?.id} className="blog-details-root">
        <Col md={12} className="blogContent mb-2">
          <div className="d-flex align-items-center">
            <Button className="nav-back" onClick={() => navigateHome()}>
              <img
                src="https://img.icons8.com/ios-filled/50/ffffff/long-arrow-left.png"
                className="arrowBack"
                alt=""
              />
            </Button>
            <div className="mt-2 ml-2">
              <h5 className="textColor">Posts</h5>
            </div>
            <div className="text-muted timer ml-auto">
              Posted : {postTimer(post?.createdAt)} ago
            </div>
          </div>
          <div className="d-flex blogPostTitle">
            <Dropdown className="dropdowntext ml-auto">
              <Dropdown.Toggle className="btn btn-dark dropdownbtn">
                <div className="text-muted dots">
                  <b>
                    <strong>•••</strong>
                  </b>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDownMenu">
                {post && post.author.id !== me ? null : (
                  <>
                    <Edit data={updatePostProps} />
                    <div className="d-flex customLinks">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="17px"
                          src="https://img.icons8.com/fluency/50/000000/delete-sign.png"
                        />
                      </div>
                      <div onClick={() => setOpen(true)}>delete</div>
                    </div>
                    <DeleteModal
                      postId={String(post?.id)}
                      smShow={open}
                      setSmShow={setOpen}
                    />
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {
            <div className="blog-details-author">
              <div
                onMouseEnter={handleDisplayShow}
                onMouseLeave={() => {
                  handleDisplayClose();
                  setTimer(true);
                }}
                className="d-flex align-items-center"
              >
                {/* <UserInfo
                  show={display}
                  handleShow={handleDisplayShow}
                  handleClose={handleDisplayClose}
                  setTimer={setTimer}
                  props={author}
                  /> */}
                <div>
                  <Link to={`/userProfile/${post.author?.id}`}>
                    <Image
                      style={{ width: "60px", height: "60px" }}
                      className="blog-author authorDetails"
                      src={
                        post.author?.image ? post.author?.image : defaultAvatar
                      }
                      roundedCircle
                    />
                  </Link>
                </div>
                <Link
                  className="text-decoration-none"
                  to={`/userProfile/${post.author?.id}`}
                >
                  <div style={{ marginLeft: "10px" }}>
                    <h3 className="text-dark authorDetails">
                      {post.author?.firstName} {post.author?.lastName}
                      {post.author?.isVerified === true && (
                        <span className=" mt-1 ml-1  d-flex-row align-items-center">
                          <img
                            alt=""
                            className="mr-2"
                            width="20px"
                            src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"
                          />
                        </span>
                      )}
                    </h3>
                    <h4 className="text-muted authorUserName">
                      @{post.author?.userName}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          }
          <h4 className="mt-3 blogText">{post?.content}</h4>
          <div className="mt-2 mb-4">
            {post?.media &&
              post?.media
                .split(".")
                .slice(-1)
                .join()
                .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                <img
                  className="blog-details-cover"
                  alt=""
                  onClick={() => setView(true)}
                  src={post?.media}
                  width="100%"
                />
              )}
            {post?.media &&
              post?.media
                .split(".")
                .slice(-1)
                .join()
                .match(`mp4|MPEG-4|mkv`) && (
                <video
                  src={post?.media}
                  className="blog-cover"
                  controls
                  autoPlay
                  muted
                ></video>
              )}
            {/* {newPost!.sharedPost && newPost!.sharedPost.id !== id ? (
              <>
                <div className="mt-3">{newPost!.sharedPost.content}</div>
                <div className="mt-2">
                  {!newPost?.sharedPost.media
                    ? null
                    : newPost?.sharedPost.media &&
                      newPost?.sharedPost.media
                        .split(".")
                        .slice(-1)
                        .join()
                        .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                        <img
                          onClick={() => setView(true)}
                          className="blog-details-cover"
                          alt=""
                          src={newPost!.sharedPost.media}
                          width="100%"
                        />
                      )}
                  {!newPost?.sharedPost.media
                    ? null
                    : newPost?.sharedPost.media &&
                      newPost?.sharedPost.media
                        .split(".")
                        .slice(-1)
                        .join()
                        .match(`mp4|MPEG-4|mkv`) && (
                        <video
                          src={newPost!.sharedPost.media}
                          className="blog-cover"
                          controls
                          autoPlay
                          muted
                        ></video>
                      )}
                </div>
              </>
            ) : null} */}
          </div>

          <div className="interactionContainer d-flex mt-2">
            <ViewModal
              view={view}
              setView={setView}
              cover={String(post?.media)}
              post={post}
            />
            <div className="d-flex justify-content-evenly">
              <div className="likes">
                {post &&
                  post?.likes
                    ?.slice(0, 2)
                    .map((user, i) => (
                      <SingleImage
                        key={i}
                        user={user as User}
                        setLikeShow={setLikeShow}
                      />
                    ))}
                {/* {blog?.likes.length > 3 && <div className="text-muted">+</div>} */}
                <LikesModal
                  likeShow={likeShow}
                  setLikeShow={setLikeShow}
                  post={post}
                />
                <div>
                  {post && post?.likes!.length > 1 ? (
                    <span className="text-muted ml-1">
                      {post.likes?.length} likes
                    </span>
                  ) : (
                    <span className="text-muted ml-1">
                      {post.likes?.length} like
                    </span>
                  )}
                </div>
              </div>
              <div className="comments ml-2">
                {post.comments!.length > 1 ? (
                  <span className="text-muted">
                    {post.comments?.length} comments
                  </span>
                ) : (
                  <span className="text-muted">
                    {post.comments?.length} comment
                  </span>
                )}
              </div>
            </div>
            <div
              onMouseEnter={handleCommentLabelShow}
              onMouseLeave={handleCommentLabelClose}
              onClick={() => showNHidde()}
              className="position-relative"
            >
              <button className="candl comment">
                <img
                  className="interactions"
                  src="https://img.icons8.com/ios-filled/50/ffffff/comment-discussion.png"
                  width="25px"
                  alt=""
                />
              </button>
              {commentLabel === false ? null : (
                <Badge pill variant="secondary" className="interactionBadge">
                  Comment
                </Badge>
              )}
            </div>

            <div
              onMouseEnter={handleLikeLabelShow}
              onMouseLeave={handleLikeLabelClose}
              className="interactions position-relative"
            >
              {!post?.likes?.some((elem) => elem?.id === me) ? (
                <>
                  <button className="candl ">
                    <img
                      className="interactions"
                      onClick={() => likePost(post.id)}
                      src="https://img.icons8.com/ios-filled/50/ffffff/two-hearts.png"
                      alt=""
                      width="25px"
                    />
                  </button>
                  {likeLabel === false ? null : (
                    <Badge
                      pill
                      variant="secondary"
                      className="interactionBadge"
                    >
                      Like
                    </Badge>
                  )}
                </>
              ) : (
                <>
                  <button className="candl ">
                    <img
                      className="interactions"
                      onClick={() => likePost(post?.id)}
                      src="https://img.icons8.com/color/50/ffffff/two-hearts.png"
                      alt=""
                      width="25px"
                    />
                  </button>
                  {likeLabel === false ? null : (
                    <Badge
                      pill
                      variant="secondary"
                      className="interactionBadge"
                    >
                      Like
                    </Badge>
                  )}
                </>
              )}
            </div>

            <div
              onMouseEnter={handleShareLabelShow}
              onMouseLeave={handleShareLabelClose}
              className="interactions position-relative m-0"
            >
              <button onClick={handleShare} className="candl share">
                <img
                  src="https://img.icons8.com/ios-filled/50/ffffff/right2.png"
                  width="25px"
                  alt=""
                />
              </button>
              {shareLabel === false ? null : (
                <Badge pill variant="secondary" className="interactionBadge">
                  Share
                </Badge>
              )}
              <ShareModal
                id={id}
                user={post?.author!}
                show={share}
                setShow={setShare}
                createdAt={post?.createdAt}
              />
            </div>
          </div>
          {show === false ? null : (
            <AddComment setComments={setComments} id={id} />
          )}
          <Col className="mt-5 p-0">
            <CommentComponent
              blog={post}
              id={id}
              comments={comments}
              author={post.author}
              fetchComments={fetchComments}
              setComments={setComments}
            />
          </Col>
        </Col>
      </Container>
    </Row>
  ) : (
    <Loader />
  );
};

export default Blog;

interface SingleImageProps {
  user: User;
  setLikeShow: Dispatch<SetStateAction<boolean>>;
}

const SingleImage = ({ user, setLikeShow }: SingleImageProps) => {
  return (
    <div className="singleImage">
      <img
        className="likeImg"
        src={String(user?.image)}
        alt=""
        width="20px"
        onClick={() => setLikeShow(true)}
      />
    </div>
  );
};
