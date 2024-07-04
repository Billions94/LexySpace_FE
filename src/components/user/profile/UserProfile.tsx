import { Avatar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { Button, Col, Image, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { defaultAvatar, defaultCover } from '../../../assets/icons';
import { Verified } from '../../../assets/svg/verified';
import { AvatarStyle, NewUserAvatar } from '../../../dummy/NewUserAvatar';
import API from '../../../lib/API';
import useAuthGuard from '../../../lib/index';
import { getUser } from '../../../lib/requests/user';
import {
  followAction,
  getFollowersAction,
  setCover,
  setDynamicId,
} from '../../../redux/actions';
import { ReduxState, User } from '../../../redux/interfaces';
import Loader from '../../loader/Loader';
import Recentposts from '../recentPost/RecentPosts';
import Cover from './Cover';
import EditProfile from './EditProfile';
import './styles.scss';
import UpdateImage from './UpdateImage';

const UserProfile: FC = () => {
  useAuthGuard();

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    following,
    cover,
    followers,
    user: loggedInUser,
  } = useSelector((state: ReduxState) => state.data);
  const me = loggedInUser?.id;
  const follower = { userToFollowId: id };

  const [show, setShow] = useState(false);
  const [pic, setPic] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const handleShow = () => setShow(true);
  const handlePic = () => setPic(true);

  const follow = async () => {
    try {
      const { data } = await API.post(`/users/me/follow`, follower);
      if (data) {
        dispatch(getFollowersAction(id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getUser = async () => {
  //   try {
  //     const { data } = await API.get(`/users/${id}`);
  //     if (data) {
  //       setUser(data);
  //     }
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const toggle = () => {
    !following ? nowFollow() : unfollow();
  };

  const nowFollow = async () => {
    await follow();
    dispatch(followAction(true));
  };

  const unfollow = async () => {
    await follow();
    dispatch(followAction(false));
    dispatch(getFollowersAction(id));
    //setLoading(true);
  };

  useEffect(() => {
    dispatch(setCover(loggedInUser.cover));
  }, []);

  useEffect(() => {
    dispatch(setDynamicId(id));
    getUser(String(id)).then(setUser);
  }, [followers.length, id]);

  console.log({ followers, following });

  return user ? (
    <>
      <Row id="userProfileContainer" className="justify-content-center">
        <Col
          className="userJumbo magicRow jumbotron-banner1 p-0 pb-3"
          sm={12}
          md={10}
          lg={7}
        >
          <Row className="magicRow d-flex p-0">
            <Col sm={6} md={7} lg={7} className="coverDiv">
              {id !== me ? (
                <>
                  {!user?.cover ? (
                    <img
                      className="cover mb-2"
                      src={defaultCover}
                      alt="new Cover"
                      height="250px"
                    />
                  ) : (
                    <img
                      className="cover mb-2"
                      src={user.cover}
                      alt=""
                      height="250px"
                    />
                  )}
                </>
              ) : (
                // Cover container
                <div>
                  <img
                    className="cover mb-2"
                    src={cover ? cover : defaultCover}
                    alt=""
                    height="250px"
                  />
                </div>
              )}
            </Col>

            {/*Cover Modal*/}
            <div className="coverModal">{id !== me ? null : <Cover />}</div>

            <div id="jinx" className="d-flex px-4 col-lg-10">
              <div className="imgDiv ml5">
                {!user.image ? (
                  <Avatar
                    onClick={handlePic}
                    sx={{
                      width: 130,
                      height: 130,
                    }}
                    children={
                      <NewUserAvatar
                        firstName={String(user?.firstName)}
                        lastName={String(user?.lastName)}
                        className={AvatarStyle.PROFILE}
                      />
                    }
                  />
                ) : (
                  <Image
                    roundedCircle
                    id="profile-pic"
                    onClick={handlePic}
                    src={user.image ? user.image : defaultAvatar}
                    alt="ProfilePicture"
                    width="130"
                    height="130"
                  />
                )}

                <div>
                  <div className="nameHeader ">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="">lives in {user.location}</div>
                  <div className="">{user.bio}</div>
                  {user?.followers?.length > 1 ? (
                    <span
                      className=" customLinks1"
                      onClick={() => navigate(`/followers/${user?.id}`)}
                    >
                      {user?.followers?.length} followers
                    </span>
                  ) : null}
                  {user?.followers?.length === 1 ? (
                    <span
                      className=" customLinks1"
                      onClick={() => navigate(`/followers/${user?.id}`)}
                    >
                      {user?.followers?.length} follower
                    </span>
                  ) : null}
                  {user?.followers?.length === 0 ? (
                    <span className=" customLinks1">
                      {user?.followers?.length} follower
                    </span>
                  ) : null}
                </div>
              </div>

              <UpdateImage
                xUser={user}
                show={pic}
                setShow={setPic}
                getUser={getUser}
                handlePic={handlePic}
              />

              <div className="text-left ml-auto justify-content-center">
                <br />
                <div className="d-flex justify-content-center mb-3">
                  {user?.isVerified && (
                    <div className=" mt-1  d-flex-row align-items-center">
                      {Verified}
                    </div>
                  )}
                </div>
                <Col md={12} lg={12}>
                  {id !== me ? null : (
                    <Button
                      onClick={handleShow}
                      variant="white"
                      className="nowfollowing text-white"
                    >
                      <p id="edit-profile1">edit Profile</p>
                    </Button>
                  )}
                  {id !== me && (
                    <p>
                      {!followers.some((user) => user.id === me) ? (
                        <Button
                          onClick={toggle}
                          variant="primary"
                          className="followbtn mt-2"
                        >
                          follow
                        </Button>
                      ) : (
                        <Button
                          onClick={toggle}
                          variant="primary"
                          className="nowfollowing mt-2"
                        >
                          following
                        </Button>
                      )}
                    </p>
                  )}
                  <EditProfile
                    show={show}
                    setShow={setShow}
                    getUser={getUser}
                  />
                </Col>
              </div>
            </div>
          </Row>
          <Col className="recentDiv">
            <Recentposts userId={id} />
          </Col>
        </Col>
      </Row>
      {/* <Col lg={12} className="justify-content-center">
      <Footer />
      </Col> */}
    </>
  ) : (
    <div className="text-center">{loading && <Loader />}</div>
  );
};

export default UserProfile;
