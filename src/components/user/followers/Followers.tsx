import { useState, useEffect } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../../loader/Loader";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getFollowersAction } from "../../../redux/actions";
import { ReduxState, User } from "../../../redux/interfaces";
import { defaultAvatar, defaultCover } from "../../../assets/icons";
import FollowersList from "./FollowersList";
import "./styles.scss";
import API from "../../../lib/API";

const Followers = () => {
  const { id } = useParams();
  const { followers } = useSelector((state: ReduxState) => state.data);
  const dispatch = useDispatch();
  const [user, setUser] = useState<User | null>(null);
  const [refresh, setRefresh] = useState(false);

  async function getUser() {
    try {
      const { data } = await API.get(`/users/${id}`);
      if (data) {
        setUser(data);
      } else {
        throw new Error("error fetching users");
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(refresh);

  useEffect(() => {
    dispatch(getFollowersAction(id));
    getUser();
  }, [refresh, id]);

  return followers.length > 0 ? (
    <Container id="followersContainer">
      <Row className="ROW justify-content-center">
        <Col className="COL pb-5 px-0" xs={12} sm={12} md={9} lg={8}>
          {user && (
            <div className="userInfo">
              <div className="position-relative w-100">
                <img
                  className="userCov"
                  src={user.cover ? user.cover : defaultCover}
                  alt=""
                  width="59px"
                />
              </div>
              <div className="userImgContainer">
                <img
                  className="userImg"
                  src={user.image ? user.image : defaultAvatar}
                  alt=""
                  width="59px"
                />
                {user.followers.length > 1 ? (
                  <h6 className="text-center mb-3">
                    {user.firstName} {user.lastName}'s followers
                  </h6>
                ) : (
                  <h6 className="text-center mb-3">
                    {user.firstName} {user.lastName}'s follower
                  </h6>
                )}
              </div>
            </div>
          )}
          <ListGroup id="listGroup">
            {followers &&
              followers.map((f) => (
                <ListGroup.Item id="listGroup" key={f._id}>
                  <FollowersList
                    f={f}
                    id={id}
                    getUser={getUser}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  ) : (
    <Loader />
  );
};

export default Followers;
