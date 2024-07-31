import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, reRouteAction } from '../../redux/actions';
import { GET_STORE } from '../../redux/store';
import PostItem from './post-item/PostItem';

const PostList: React.FC = () => {
  const dispatch = useDispatch();
  const {
    data: { posts, isLoading },
  } = useSelector(GET_STORE);

  useEffect(() => {
    dispatch(getPosts());
    reRouteAction(false);
  }, []);

  return (
    <Row id="blogList" className="blogList justify-content-center">
      {isLoading ? (
        <div className="loader">
          <Spinner animation="border" />{' '}
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <Col key={post.id} md={12} lg={12} style={{ padding: '0px' }}>
              <div className="blogList">
                <PostItem key={post.id} postId={post.id} />
              </div>
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};

export default PostList;
