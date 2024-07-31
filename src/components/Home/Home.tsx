import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GET_STORE } from 'src/redux/store';
import useAuthGuard from '../../lib/index';
import {
  hideMeAction,
  hideNotesAction,
  reRouteAction,
} from '../../redux/actions';
import Loader from '../loader/Loader';
import MusicPlayer from '../musicplayer/MusicPlayer';
import HotPosts from '../post/HotPosts';
import PostContainer from '../post/Post';
import PostList from '../post/PostList';
import Search from '../post/Search';
import TaskList from '../post/TaskList';
import WeatherWidget from '../weather/WeatherWidget';
import './styles.scss';
import Blog from './views';

const Home = () => {
  useAuthGuard();

  const dispatch = useDispatch();
  const [fetchLoading, setFetchLoading] = useState(false);
  const {
    data: { hideMe, reroute, hideTask, posts, postId },
  } = useSelector(GET_STORE);

  const toggleHide = () => {
    !hideMe ? dispatch(hideMeAction(true)) : dispatch(hideMeAction(false));
  };

  const toggleHideTask = () => {
    !hideTask
      ? dispatch(hideNotesAction(true))
      : dispatch(hideNotesAction(false));
  };

  useEffect(() => {
    reRouteAction(false);
  }, []);

  return posts ? (
    <Container id="mainContainer" className="pt-0 ml-auto" fluid="sm">
      <Row className="pt-0 mainContainer justify-content-center">
        <Col
          className="sidebar d-none d-xs-none d-sm-none d-md-flex"
          sm={4}
          md={4}
          lg={4}
        >
          <Col style={{ overflow: 'hidden' }}>
            <MusicPlayer />
            <Search />
            <HotPosts />
            <div
              onClick={toggleHide}
              className="d-flex"
              style={{ cursor: 'pointer' }}
            >
              <div className="text-muted sidebarFont">Weather</div>
              <div className="ml-auto">
                {!hideMe ? (
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
            {!hideMe ? <WeatherWidget /> : null}
            <div
              onClick={() => toggleHideTask()}
              className="d-flex"
              style={{ cursor: 'pointer' }}
            >
              <div className="text-muted sidebarFont">NotePad</div>
              <div className="ml-auto">
                {!hideTask ? (
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
            {!hideTask ? <TaskList /> : null}
            <div className="sticky-top mt-5">{/*<Footer />*/}</div>
          </Col>
        </Col>
        <Col className="feed" sm={12} md={7} lg={7}>
          {!reroute ? (
            <Col className="mainfeed justify-content-center" md={11} lg={12}>
              <PostContainer
                fetchLoading={fetchLoading}
                setFetchLoading={setFetchLoading}
              />
              <PostList />
            </Col>
          ) : (
            <Blog />
          )}
        </Col>
        <Col lg={1}></Col>
      </Row>
    </Container>
  ) : (
    <Loader />
  );
};

export default Home;
