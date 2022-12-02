import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import BlogList from "../post/BlogList";
import Weather from "../post/Weather";
import useAuthGuard from "../../lib/index";
import { useDispatch, useSelector } from "react-redux";
import { hideMeAction, hideTaskAction } from "../../redux/actions";
import HotPosts from "../post/HotPosts";
import { ReduxState } from "../../redux/interfaces";
import Blog from "../post/views";
import Footer from "../footer/Footer";
import PostContainer from "../post/Post";
import TaskList from "../post/TaskList";
import Search from "../post/Search";
import { Element } from "react-scroll";
import MusicPlayer from "../musicplayer/MusicPlayer";
import { usePostsQuery } from "../../generated";
import "./styles.scss";

// import Blog from "../views/Index"

const Home = () => {
  useAuthGuard();

  const dispatch = useDispatch();
  const [value, setValue] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const { hideMe, reroute, hideTask } = useSelector(
    (state: ReduxState) => state.data
  );
  const { posts } = useSelector((state: ReduxState) => state);

  const toggleHide = () => {
    hideMe === false
      ? dispatch(hideMeAction(true))
      : dispatch(hideMeAction(false));
  };

  const toggleHideTask = () => {
    hideTask === false
      ? dispatch(hideTaskAction(true))
      : dispatch(hideTaskAction(false));
  };

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      setValue(window.scrollY);
    });

    window.scrollTo({ top: value, behavior: "smooth" });
  }, [reroute]);

  return (
    posts && (
      <Container id="mainContainer" className="pt-0 ml-auto" fluid="sm">
        <Row className="pt-0 mainContainer justify-content-center">
          <Col
            className="sidebar d-none d-xs-none d-sm-none d-md-flex"
            sm={4}
            md={4}
            lg={4}
          >
            <Col style={{ overflow: "hidden" }}>
              <MusicPlayer />
              <Search />
              <HotPosts />
              <div
                onClick={() => toggleHide()}
                className="d-flex"
                style={{ cursor: "pointer" }}
              >
                <div className="text-muted sidebarFont">Weather</div>
                <div className="ml-auto">
                  {hideMe === false ? (
                    <img
                      src="https://img.icons8.com/ios-filled/50/ffffff/invisible.png"
                      width="27px"
                      height="27px"
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/ios-filled/50/ffffff/closed-eye.png"
                      width="27px"
                      height="27px"
                      alt=""
                    />
                  )}
                </div>
              </div>
              {hideMe === false ? <Weather /> : null}
              <div
                onClick={() => toggleHideTask()}
                className="d-flex"
                style={{ cursor: "pointer" }}
              >
                <div className="text-muted sidebarFont">NotePad</div>
                <div className="ml-auto">
                  {hideTask === false ? (
                    <img
                      src="https://img.icons8.com/ios-filled/50/ffffff/invisible.png"
                      width="27px"
                      height="27px"
                      alt=""
                    />
                  ) : (
                    <img
                      src="https://img.icons8.com/ios-filled/50/ffffff/closed-eye.png"
                      width="27px"
                      height="27px"
                      alt=""
                    />
                  )}
                </div>
              </div>
              {hideTask === false ? <TaskList /> : null}
              <div className="sticky-top mt-5">
                <Footer />
              </div>
            </Col>
          </Col>
          <Col className="feed" sm={12} md={7} lg={7}>
            {reroute === false ? (
              <Col className="mainfeed justify-content-center" md={11} lg={12}>
                <PostContainer
                  fetchLoading={fetchLoading}
                  setFetchLoading={setFetchLoading}
                />
                <BlogList
                  posts={posts}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </Col>
            ) : (
              <Col md={11} lg={12}>
                <Element name="postSectionInner">
                  <Blog />
                </Element>
              </Col>
            )}
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Container>
    )
  );
};

export default Home;
