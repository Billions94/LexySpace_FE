import {
  Container,
  Dropdown,
  Image,
  Col,
  Badge,
  Button,
  Row,
} from 'react-bootstrap';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Post, Comment, User, ReduxState } from '../../../redux/interfaces';
import {
  getPostById,
  likeAction,
  reRouteAction,
  setDynamicId,
} from '../../../redux/actions';
import { useNavigate, Link, useParams } from 'react-router-dom';
import useAuthGuard, { dateFormatter } from '../../../lib';
import { useSelector, useDispatch } from 'react-redux';
import { defaultAvatar } from '../../../assets/icons';
import CommentComponent from '../../comment/Comment';
import AddComment from '../../comment/new/AddComment';
import Edit from '../../post/crud/EditPost';
import Loader from '../../loader/Loader';
import ShareModal from './SharedModal';
import ViewModal from './ViewModal';
import DeleteModal from '../../post/crud/DeleteModal';
import LikesModal from './LikesModal';
import API from '../../../lib/API';
import React from 'react';
import './styles.scss';

const Blog: React.FC = () => {
  useAuthGuard();

  const { id } = useParams();
  const navigate = useNavigate();

  const { user: loggedInUser } = useSelector(
    (state: ReduxState) => state['data']
  );

  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState<User | null>(null);
  const [blog, setBlog] = useState<Post | null>(null);
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

  function handleDisplayClose() {
    setTimeout(() => {
      if (timer) {
        setDisplay(false);
        setTimer(false);
      }
    }, 1000);
  }

  const url = process.env.REACT_APP_GET_URL;
  const dispatch = useDispatch();
  const { user, posts } = useSelector((state: ReduxState) => state.data);
  const me = user?.id;
  const liker = { userId: me };
  // for interaction icons label
  const [show, setShow] = useState(false);
  const [commentLabel, setCommentLabel] = useState(false);
  const [likeLabel, setLikeLabel] = useState(false);
  const [shareLabel, setShareLabel] = useState(false);
  // for handle the reshaped modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShare = () => setShare(true);

  const handleCommentLabelShow = () => setCommentLabel(true);
  const handleLikeLabelShow = () => setLikeLabel(true);
  const handleShareLabelShow = () => setShareLabel(true);

  const handleCommentLabelClose = () => setCommentLabel(false);
  const handleLikeLabelClose = () => setLikeLabel(false);
  const handleShareLabelClose = () => setShareLabel(false);

  const showAndHide = () => {
    !show ? handleShow() : handleClose();
  };

  const fetchBlog = async (postId: string) => {
    try {
      const { data } = await API.get(`/posts/${postId}`);
      if (data) {
        setBlog(data.posts as Post);
        setAuthor(data.posts.user);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await API.get<Post>(`/comments`);
      if (data) {
        const latestComments = data?.comments?.reverse();
        setComments(latestComments);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const toggle = (postId: string) => {
    !blog?.likes ? likePost(postId) : unLikePost(postId);
  };

  const likePost = async (postId: string) => {
    await like(postId);
    dispatch(likeAction(loggedInUser));
  };

  const unLikePost = async (postId: string) => {
    await like(postId);
    dispatch(likeAction(loggedInUser));
  };

  const like = async (postId: string) => {
    try {
      await API.patch(`/posts/${postId}/likes`, liker);
      await fetchBlog(postId);
    } catch (error) {
      console.log(error);
    }
  };

  const newPost = posts.find((p) => p.id === id);

  useEffect(() => {
    (async () => fetchBlog(id as string))();
    dispatch(getPostById(id));
    dispatch(setDynamicId(id));
  }, [id, refresh]);

  useEffect(() => {
    window.scrollTo({ top: window.scrollY, behavior: 'smooth' });
  }, [id, reRouteAction]);

  function navigateHome() {
    dispatch(reRouteAction(false));
    navigate(-1);
  }

  const updatePostProps = {
    postId: String(blog?.id),
    reload: refresh,
    setReload: setRefresh,
  };

  return !blog ? (
    <Loader />
  ) : (
    <Row id="indexDiv">
      <Container key={blog?.id} className="blog-details-root">
        <Col md={12} className="blogContent mb-2">
          <div className="d-flex align-items-center">
            <Button className="nav-back" onClick={navigateHome}>
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
              Posted : {dateFormatter(blog?.createdAt)} ago
            </div>
          </div>
          <div className="d-flex blogPostTitle">
            <Dropdown id={''} className="dropdowntext ml-auto">
              <Dropdown.Toggle className="btn btn-dark dropdownbtn">
                <div className="text-muted dots">
                  <b>
                    <strong>•••</strong>
                  </b>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropDownMenu">
                <a className="deleteBlog" href={`${url}/${id}/downloadPDF`}>
                  <div className="d-flex customLinks">
                    <div className="mr-3">
                      <img
                        alt=""
                        className="lrdimg"
                        width="17px"
                        src="https://img.icons8.com/ios-filled/50/ffffff/circled-down.png"
                      />
                    </div>
                    <div className="">download pdf</div>
                  </div>
                </a>
                {blog && blog.user?.id !== me ? null : (
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
                      postId={blog?.id}
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

                {/* Post Author */}
                <div>
                  <Link to={`/userProfile/${author?.id}`}>
                    <Image
                      style={{ width: '60px', height: '60px' }}
                      className="blog-author authorDetails"
                      src={author?.image ? author?.image : defaultAvatar}
                      roundedCircle
                    />
                  </Link>
                </div>
                <Link
                  className="text-decoration-none"
                  to={`/userProfile/${author?.id}`}
                >
                  <div style={{ marginLeft: '10px' }}>
                    <h3 className="text-dark authorDetails">
                      {author?.firstName} {author?.lastName}
                      {author?.isVerified && (
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
                      @{author?.username}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          }
          <div style={{ paddingLeft: '10px' }}>
            <h4 className="mt-3 blogText">{blog?.text}</h4>
          </div>
          <div className="mt-2 mb-4">
            {!blog?.media
              ? null
              : blog?.media &&
                blog?.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                  <img
                    className="blog-details-cover"
                    alt=""
                    onClick={() => setView(true)}
                    src={blog?.media}
                    width="100%"
                  />
                )}
            {!blog?.media
              ? null
              : blog?.media &&
                blog?.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`mp4|MPEG-4|mkv`) && (
                  <video
                    src={blog?.media}
                    className="blog-cover"
                    controls
                    autoPlay
                    muted
                  ></video>
                )}
            {newPost?.sharedPost && newPost?.sharedPost.id !== id ? (
              <>
                <div className="mt-3">{newPost?.sharedPost.text}</div>
                <div className="mt-2">
                  {!newPost?.sharedPost.media
                    ? null
                    : newPost?.sharedPost.media &&
                      newPost?.sharedPost.media
                        .split('.')
                        .slice(-1)
                        .join()
                        .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                        <img
                          onClick={() => setView(true)}
                          className="blog-details-cover"
                          alt=""
                          src={newPost?.sharedPost?.media}
                          width="100%"
                        />
                      )}
                  {!newPost?.sharedPost.media
                    ? null
                    : newPost?.sharedPost.media &&
                      newPost?.sharedPost.media
                        .split('.')
                        .slice(-1)
                        .join()
                        .match(`mp4|MPEG-4|mkv`) && (
                        <video
                          src={newPost?.sharedPost?.media}
                          className="blog-cover"
                          controls
                          autoPlay
                          muted
                        ></video>
                      )}
                </div>
              </>
            ) : null}
          </div>

          <div className="interactionContainer d-flex mt-2">
            <ViewModal
              view={view}
              setView={setView}
              cover={blog?.media}
              post={blog}
            />
            <div className="d-flex justify-content-evenly">
              <div className="likes">
                {blog?.likes?.length > 0 &&
                  blog?.likes
                    .slice(0, 2)
                    .map((user) => (
                      <SingleImage
                        key={user.id}
                        user={user}
                        setLikeShow={setLikeShow}
                      />
                    ))}
                {/* {blog?.likes.length > 3 && <div className="text-muted">+</div>} */}
                <LikesModal
                  likeShow={likeShow}
                  setLikeShow={setLikeShow}
                  post={blog}
                />
                <div>
                  {blog.likes.length > 1 ? (
                    <span className="text-muted ml-1">
                      {blog?.likes?.length ?? 0} likes
                    </span>
                  ) : (
                    <span className="text-muted ml-1">
                      {blog?.likes?.length ?? 0} like
                    </span>
                  )}
                </div>
              </div>
              <div className="comments ml-2">
                {blog?.comments?.length > 1 ? (
                  <span className="text-muted">
                    {blog?.comments?.length ?? 0} comments
                  </span>
                ) : (
                  <span className="text-muted">
                    {blog?.comments?.length ?? 0} comment
                  </span>
                )}
              </div>
            </div>
            <div
              onMouseEnter={handleCommentLabelShow}
              onMouseLeave={handleCommentLabelClose}
              onClick={showAndHide}
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
              {!commentLabel ? null : (
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
              {!blog?.likes?.some((elem) => elem.id === me) ? (
                <>
                  <button className="candl ">
                    <img
                      className="interactions"
                      onClick={() => toggle(blog?.id)}
                      src="https://img.icons8.com/ios-filled/50/ffffff/two-hearts.png"
                      alt=""
                      width="25px"
                    />
                  </button>
                  {!likeLabel ? null : (
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
                      onClick={() => toggle(blog?.id)}
                      src="https://img.icons8.com/color/50/ffffff/two-hearts.png"
                      alt=""
                      width="25px"
                    />
                  </button>
                  {!likeLabel ? null : (
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
              {!shareLabel ? null : (
                <Badge pill variant="secondary" className="interactionBadge">
                  Share
                </Badge>
              )}
              <ShareModal
                id={id}
                user={blog?.user}
                show={share}
                setShow={setShare}
                createdAt={blog?.createdAt}
              />
            </div>
          </div>
          {!show ? null : <AddComment setComments={setComments} id={id} />}
          <Col className="mt-5 p-0">
            <CommentComponent
              blog={blog}
              id={id}
              comments={comments}
              author={author}
              fetchComments={fetchComments}
              setComments={setComments}
            />
          </Col>
        </Col>
      </Container>
    </Row>
  );
};

export default Blog;

interface SingleImageProps {
  user: User;
  setLikeShow: Dispatch<SetStateAction<boolean>>;
}

const SingleImage: React.FC<SingleImageProps> = ({ user, setLikeShow }) => {
  return (
    <div className="singleImage">
      <img
        className="likeImg"
        src={user?.image}
        alt=""
        width="20px"
        onClick={() => setLikeShow(true)}
      />
    </div>
  );
};
