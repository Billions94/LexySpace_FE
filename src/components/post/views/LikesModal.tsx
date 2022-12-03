import { Button, Modal } from "react-bootstrap";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { ReduxState } from "../../../redux/interfaces";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followAction, getUsersAction } from "../../../redux/actions";
import { FollowUser } from "../../../lib/requests/interfaces/user.interface";
import { follow } from "../../../lib/requests/user";
import { getPosts } from "../../../lib/requests/post";
import { Post } from "../../../dto";

interface Props {
  likeShow: boolean;
  setLikeShow: Dispatch<SetStateAction<boolean>>;
  post: Post;
}

const LikesModal: FC<Props> = ({ likeShow, setLikeShow, post }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { following } = useSelector((state: ReduxState["data"]) => state);
  const newUser = useSelector((state: ReduxState) => state.data.user);

  const me = newUser?._id;

  function returnFollowerData(
    userToFollowId: string,
    followerUserData: FollowUser
  ): FollowUser {
    return {
      userId: followerUserData.userId,
      following: {
        followingUserID: userToFollowId,
      },
      dispatch: followUserData.dispatch,
    };
  }

  const followUserData = {
    userId: me,
    following: {
      followingUserID: "",
    },
    dispatch,
  };

  const toggle = (followUser: FollowUser) => {
    !following ? nowFollow(followUser) : unfollow(followUser);
  };

  const nowFollow = (followUser: FollowUser) => {
    follow(followUser);
    dispatch(followAction(true));
    dispatch(getUsersAction());
  };
  const unfollow = (followUser: FollowUser) => {
    follow(followUser);
    dispatch(followAction(false));
    dispatch(getUsersAction());
  };

  useEffect(() => {
    console.log("memory leak detected");
    getPosts(dispatch);
    dispatch(getUsersAction());
  }, [following]);

  return (
    <div>
      <Modal
        id="likesModal"
        style={{ borderRadius: "20px" }}
        show={likeShow}
        centered
        onHide={() => setLikeShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <div>Liked by</div>
        </Modal.Header>
        <Modal.Body>
          {post.likes?.map((user, i) => (
            <div key={i} id="searchContainer" className="d-flex mt-2">
              <div
                onClick={() => navigate(`/userProfile/${user?.id}`)}
                className="linkToProfile"
              >
                <img className="profile-pic" src={String(user?.image)} alt="" />
                <div className="ml-2">
                  <h6 className="firstandlastname">
                    {user?.firstName} {user?.lastName}
                    {user?.isVerified === true && (
                      <span className=" ml-1">
                        <img
                          alt=""
                          className="mr-2"
                          width="15"
                          src="https://img.icons8.com/ios-filled/50/4a90e2/verified-account.png"
                        />
                      </span>
                    )}
                  </h6>
                  <h6 className="text-muted username">@{user?.userName}</h6>
                  <h6 className="bio">{user?.bio}</h6>
                </div>
              </div>
              <div className="ml-auto">
                {user?.id !== me ? (
                  <div className="ml-auto">
                    {user?.followers?.some(
                      (follower: any) => follower === newUser._id
                    ) ? (
                      <Button
                        onClick={() =>
                          toggle(returnFollowerData(user?.id, followUserData))
                        }
                        size="sm"
                        variant="primary"
                        className="nowfollowing ml-auto"
                      >
                        following
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          toggle(
                            returnFollowerData(String(user?.id), followUserData)
                          )
                        }
                        size="sm"
                        variant="primary"
                        className="followbtn ml-auto"
                      >
                        follow
                      </Button>
                    )}
                  </div>
                ) : null}
                {/* <SingleUser toggle={toggle} following={following} user={user} me={me} /> */}
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LikesModal;
