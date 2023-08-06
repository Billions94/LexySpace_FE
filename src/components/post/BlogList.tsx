import { Row, Col, Spinner } from 'react-bootstrap';
import PostItem from './post-item/PostItem';
import React, { SetStateAction, useEffect, Dispatch } from 'react';
import Loader from '../loader/Loader';
import { Post } from '../../redux/interfaces';

interface BlogListProps {
  posts: Post[];
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, Math.random() * 500);
  }, []);

  return posts ? (
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
                <PostItem key={post.id} post={post} postId={post.id} />
              </div>
            </Col>
          ))}
        </>
      )}
    </Row>
  ) : (
    <Loader />
  );
};

export default BlogList;
