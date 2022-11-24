import { FC, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Container, Navbar, Button, Dropdown } from "react-bootstrap";
import logo from "../../assets/asset6.png";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction, reRouteAction } from "../../redux/actions";
import { ReduxState } from "../../redux/interfaces";
import PostModal from "../post/crud/PostModal";
import API from "../../lib/API";
import message from "../../assets/message.png";
import userProfile from "../../assets/user.png";
import settings from "../../assets/settings.png";
import logOutIcon from "../../assets/logOut.png";
import home from "../../assets/home.png";
import "./styles.scss";

const NavBar: FC = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const { user } = useSelector((state: ReduxState) => state.data);
  const userId = user!._id;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logOut(): Promise<void> {
    await API.delete("/sessions");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cover");

    navigate("/");
  }

  function route() {
    dispatch(reRouteAction(false));
    navigate("/home");
  }

  useEffect(() => {
    dispatch(getUsersAction());
  }, [show]);

  return (
    <>
      {location.pathname === "/" && (
        <Navbar expand="lg" className="blog-navbar1 " fixed="top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand as={Link} to="/">
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>
            <div className="d-flex signup">
              <Button
                onClick={() => navigate("/register")}
                className="blog-navbar-add-button  newBlogPost"
                size="lg"
              >
                <div className="">
                  <img
                    src="https://img.icons8.com/material-rounded/50/ffffff/add-user-male.png"
                    width="20px"
                  />
                </div>
                <div style={{ fontSize: "16px" }}> sign Up </div>
              </Button>

              <Button
                onClick={() => navigate("/login")}
                className="ml-2 blog-navbar-add-button  newBlogPost"
                size="lg"
              >
                <div className="">
                  <img
                    src="https://img.icons8.com/glyph-neue/50/ffffff/logout-rounded.png"
                    width="20px"
                  />
                </div>
                <div style={{ fontSize: "16px" }}> log In </div>
              </Button>
            </div>
          </Container>
        </Navbar>
      )}

      {location.pathname === "/home" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => route()}>
              <img
                className="blog-navbar-brand"
                alt="logo"
                src={logo}
                width="50px"
              />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>

            <div className="d-flex justity-content-between">
              <div>
                <Button onClick={handleShow} className="newBlogPost" size="lg">
                  <div>
                    <img
                      alt=""
                      src="https://img.icons8.com/ios-filled/50/ffffff/new.png"
                      width="23px"
                    />
                  </div>
                  <div style={{ fontSize: "16px" }}> newPost </div>
                </Button>
                <PostModal show={show} setShow={setShow} />
              </div>
              <div className="customDD">
                <Dropdown style={{ marginTop: "7px" }}>
                  <Dropdown.Toggle className="btn btn-dark navToggle">
                    <Avatar
                      className="d-block avatar"
                      alt=""
                      src={user!.image}
                      sx={{
                        width: 34,
                        height: 34,
                        marginLeft: "-14px",
                        marginTop: "-8px",
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ borderRadius: "20px", padding: "20px" }}
                  >
                    <div
                      className="customLinks"
                      onClick={() => navigate("/messages")}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={message}
                          />
                        </div>
                        <div>messages</div>
                      </div>
                    </div>

                    <div
                      className="customLinks"
                      onClick={() => navigate(`/userProfile/${userId}`)}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={userProfile}
                          />
                        </div>
                        <div>goTo Profile</div>
                      </div>
                    </div>

                    <div
                      className="customLinks"
                      onClick={() => navigate(`/settings`)}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={settings}
                          />
                        </div>
                        <div>settings</div>
                      </div>
                    </div>

                    <div onClick={() => logOut()} className="customLinks">
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={logOutIcon}
                          />
                        </div>
                        <div>logOut</div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>
        </div>
      )}

      {location.pathname === "/messages" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand
              className="customCursor"
              onClick={() => navigate("/home")}
            >
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px" }}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar
                    className="d-block avatar"
                    alt=""
                    src={user!.image}
                    sx={{
                      width: 34,
                      height: 34,
                      marginLeft: "-14px",
                      marginTop: "-8px",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ borderRadius: "20px", padding: "20px" }}
                >
                  <br />

                  <div
                    className="customLinks"
                    onClick={() => navigate(`/home`)}
                  >
                    <div style={{ marginTop: "-20px" }} className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={home}
                        />
                      </div>
                      <div>home</div>
                    </div>
                  </div>

                  <div
                    className="customLinks"
                    onClick={() => navigate(`/userProfile/${userId}`)}
                  >
                    <div className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={userProfile}
                        />
                      </div>
                      <div>goTo Profile</div>
                    </div>
                  </div>

                  <div
                    className="customLinks"
                    onClick={() => navigate(`/settings`)}
                  >
                    <div className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={settings}
                        />
                      </div>
                      <div>settings</div>
                    </div>
                  </div>

                  <div onClick={() => logOut()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={logOutIcon}
                        />
                      </div>
                      <div>logOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      )}

      {location.pathname === "/settings" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand className="customCursor" onClick={() => route()}>
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px" }}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar
                    className="d-block avatar"
                    alt=""
                    src={user!.image}
                    sx={{
                      width: 34,
                      height: 34,
                      marginLeft: "-14px",
                      marginTop: "-8px",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ borderRadius: "20px", padding: "20px" }}
                >
                  <br />
                  <div className="customLinks" onClick={() => route()}>
                    <div style={{ marginTop: "-20px" }} className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={home}
                        />
                      </div>
                      <div>home</div>
                    </div>
                  </div>

                  <div onClick={() => logOut()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={logOutIcon}
                        />
                      </div>
                      <div>logOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      )}

      {location.pathname === "/closeAccount" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand
              className="customCursor"
              onClick={() => navigate("/home")}
            >
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>

            <div className="customDD">
              <Dropdown style={{ marginTop: "7px" }}>
                <Dropdown.Toggle className="btn btn-dark navToggle">
                  <Avatar
                    className="d-block avatar"
                    alt=""
                    src={user!.image}
                    sx={{
                      width: 34,
                      height: 34,
                      marginLeft: "-14px",
                      marginTop: "-8px",
                    }}
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu
                  id="dropdwnMenu"
                  style={{ borderRadius: "20px", padding: "20px" }}
                >
                  <br />
                  <Link to={"/home"} className="deleteBlog">
                    <div style={{ marginTop: "-20px" }} className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={home}
                        />
                      </div>
                      <div>home</div>
                    </div>
                  </Link>

                  <div onClick={() => logOut()} className="customLinks">
                    <div className="d-flex">
                      <div className="mr-3">
                        <img
                          alt=""
                          className="lrdimg"
                          width="20px"
                          src={logOutIcon}
                        />
                      </div>
                      <div>logOut</div>
                    </div>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Container>
        </div>
      )}

      {location.pathname === "/register" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand
              className="customCursor"
              onClick={() => navigate("/")}
            >
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      )}

      {location.pathname === "/login" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand
              className="customCursor"
              onClick={() => navigate("/")}
            >
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      )}

      {location.pathname === "/editNewUser" && (
        <div className="blog-navbar  sticky-top">
          <Container className="justify-content-between d-flex px-4">
            <Navbar.Brand
              className="customCursor"
              onClick={() => navigate("/")}
            >
              <img className="blog-navbar-brand" alt="logo" src={logo} />
              <span className="navspan ml-2">LexySpace</span>
            </Navbar.Brand>
          </Container>
        </div>
      )}

      {location.pathname !== "/messages" &&
        location.pathname !== "/home" &&
        location.pathname !== "/userProfile" &&
        location.pathname !== "/settings" &&
        location.pathname !== "/closeAccount" &&
        location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname !== "/login" &&
        location.pathname !== "/editNewUser" && (
          <div className="blog-navbar  sticky-top">
            <Container className="justify-content-between d-flex px-4">
              <Navbar.Brand className="customCursor" onClick={() => route()}>
                <img className="blog-navbar-brand" alt="logo" src={logo} />
                <span className="navspan ml-2">LexySpace</span>
              </Navbar.Brand>

              <div className="customDD">
                <Dropdown style={{ marginTop: "7px" }}>
                  <Dropdown.Toggle className="btn btn-dark navToggle">
                    <Avatar
                      className="d-block avatar"
                      alt=""
                      src={user!.image}
                      sx={{
                        width: 34,
                        height: 34,
                        marginLeft: "-14px",
                        marginTop: "-8px",
                      }}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu
                    style={{ borderRadius: "20px", padding: "20px" }}
                  >
                    <br />
                    <div className="customLinks" onClick={() => route()}>
                      <div style={{ marginTop: "-20px" }} className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={home}
                          />
                        </div>
                        <div>home</div>
                      </div>
                    </div>

                    <div
                      className="customLinks"
                      onClick={() => navigate("/messages")}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={message}
                          />
                        </div>
                        <div>messages</div>
                      </div>
                    </div>

                    <div
                      className="customLinks"
                      onClick={() => navigate(`/userProfile/${userId}`)}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={userProfile}
                          />
                        </div>
                        <div>goTo Profile</div>
                      </div>
                    </div>

                    <div
                      className="customLinks"
                      onClick={() => navigate("/settings")}
                    >
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={settings}
                          />
                        </div>
                        <div>settings</div>
                      </div>
                    </div>

                    <div onClick={() => logOut()} className="customLinks">
                      <div className="d-flex">
                        <div className="mr-3">
                          <img
                            alt=""
                            className="lrdimg"
                            width="20px"
                            src={logOutIcon}
                          />
                        </div>
                        <div>logOut</div>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Container>
          </div>
        )}
    </>
  );
};

export default NavBar;
