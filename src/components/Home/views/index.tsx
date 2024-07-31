import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Dropdown, Image, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { defaultAvatar } from '../../../assets/icons';

import { getIsUpdated } from 'src/util/funcs';
import { useComments } from '../../../components/hooks/useComments';
import { PostLayout } from '../../../components/post/views';
import useAuthGuard, { dateFormatter } from '../../../lib';
import API from '../../../lib/API';
import { reRouteAction, setDynamicId } from '../../../redux/actions';
import { Post, ReduxState, User } from '../../../redux/interfaces';
import Loader from '../../loader/Loader';
import CommentComponent from '../../post/comment/Comment';
import AddComment from '../../post/comment/new/AddComment';
import DeleteModal from '../../post/crud/DeleteModal';
import Edit from '../../post/crud/EditPost';
import './styles.scss';

const Blog: React.FC = () => {
  useAuthGuard();

  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const { setComments, fetchComments } = useComments();

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
  const { user } = useSelector((state: ReduxState) => state.data);
  const me = user?.userName;
  // for interaction icons label
  const [show, setShow] = useState(false);

  const fetchBlog = async (postId: string) => {
    try {
      const { data } = await API.get(`/posts/${postId}`);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  function navigateHome() {
    dispatch(reRouteAction(false));
    navigate(-1);
  }

  const updatePostProps = {
    postId: String(post?.id),
    reload: refresh,
    setReload: setRefresh,
  };

  useEffect(() => {
    fetchBlog(id as string).then(({ post }) => {
      setPost(post as Post);
      setAuthor(post?.user);
    });

    dispatch(setDynamicId(id));
    fetchComments();
  }, [refresh, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  return post ? (
    <Row id="indexDiv">
      <Container key={post.id} className="post-details-root">
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
              ● {getIsUpdated(post) ? 'edited' : 'posted'} :{' '}
              {dateFormatter(post.createdAt)} ago
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
                {post && post.user?.userName !== me ? null : (
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
                      postId={post.id}
                      smShow={open}
                      setSmShow={setOpen}
                    />
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {
            <div className="post-details-author">
              <div
                onMouseEnter={handleDisplayShow}
                onMouseLeave={() => {
                  handleDisplayClose();
                  setTimer(true);
                }}
                className="d-flex align-items-center"
              >
                {/* Post Author */}
                <div>
                  <Link to={`/userProfile/${author?.userName}`}>
                    <Image
                      style={{ width: '60px', height: '60px' }}
                      className="post-author authorDetails"
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
                      @{author?.userName}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          }
          <div style={{ paddingLeft: '10px' }}>
            <h4 className="mt-3 blogText">{post?.text}</h4>
          </div>
          <div className="mt-2 mb-4 post-detail-image-container">
            {!post?.media
              ? null
              : post?.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                  <LazyLoadImage
                    className="post-detail-image"
                    alt=""
                    onClick={() => setView(true)}
                    src={post?.media}
                    width="100%"
                  />
                )}
            {!post?.media
              ? null
              : post?.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`mp4|MPEG-4|mkv|mov`) && (
                  <video
                    src={post?.media}
                    className="post-cover"
                    controls
                    autoPlay
                    height={450}
                  ></video>
                )}
          </div>

          <PostLayout
            {...{
              setLikeShow,
              setView,
              view,
              post,

              likeShow,
            }}
          />
          {!show ? null : <AddComment setComments={setComments} id={id} />}
          <Col className="mt-5 p-0">
            <CommentComponent post={post} id={id} author={author} />
          </Col>
        </Col>
      </Container>
    </Row>
  ) : (
    <Loader />
  );
};

export default Blog;
