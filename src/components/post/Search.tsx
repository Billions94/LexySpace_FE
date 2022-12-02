import { User, ReduxState } from "../../redux/interfaces";
import API from "../../lib/API";
import { useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { followAction } from "../../redux/actions";

const Search = () => {
  const beUrl = process.env.REACT_APP_GET_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const newUser = useSelector((state: ReduxState) => state.data.user);
  const me = newUser._id;
  const follower = { followerId: newUser._id };

  function filter(query: string) {
    const filteredUser = users.filter((user) => {
      return user!.firstName!.toLowerCase().includes(query.toLowerCase());
    });
    setUsers(filteredUser);
  }

  const getUsers = async () => {
    if (input) {
      try {
        const { data } = await API.get<User[]>(`/users?name=${input}`);
        if (data) {
          setUsers(data);
        } else throw new Error("could not get users");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const follow = async (userId: string | undefined) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${beUrl}/users/${userId}/follow`, {
        method: "POST",
        body: JSON.stringify(follower),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // dispatch(getPosts())
        console.log("Now following user", data);
      } else {
        throw new Error("Something went wrong :(");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const xUser = users.find((u) => u._id !== me);

  const toggle = (userId: string | undefined) => {
    !xUser?.followers ? nowFollow(userId) : unfollow(userId);
  };

  const nowFollow = (userId: string | undefined) => {
    follow(userId);
    dispatch(followAction(true));
  };
  const unfollow = (userId: string | undefined) => {
    follow(userId);
    dispatch(followAction(false));
  };

  useEffect(() => {
    getUsers();
  }, [input]);

  return (
    <div id="searchContainer" className="mb-3">
      <Col className="customInputDiv">
        <Form className="mb-4">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              className="customInput"
              type="search"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                filter(e.target.value);
              }}
              placeholder="Search LexySpace"
            />
          </Form.Group>
        </Form>
      </Col>
      <div>
        {users &&
          users.map((user) => (
            <div key={user._id} className="d-flex">
              <div
                onClick={() => navigate(`/userProfile/${user._id}`)}
                className="linkToProfile"
              >
                <img className="profile-pic" src={user.image} alt="" />
                <div className="ml-2">
                  <h6 className="firstandlastname">
                    {user.firstName} {user.lastName}
                    {user.isVerified === true && (
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
                  <h6 className="username text-muted">@{user.userName}</h6>
                  <h6 className="bio">{user.bio}</h6>
                </div>
              </div>
              <div className="ml-auto">
                {user._id !== me && (
                  <div className="ml-auto">
                    {!xUser!.followers.some((elem) => elem._id === me) ? (
                      <Button
                        onClick={() => toggle(user._id)}
                        size="sm"
                        variant="primary"
                        className="followbtn ml-auto"
                      >
                        follow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => toggle(user._id)}
                        size="sm"
                        variant="primary"
                        className="nowfollowing ml-auto"
                      >
                        following
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
