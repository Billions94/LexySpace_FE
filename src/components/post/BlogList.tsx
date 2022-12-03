import { Row, Col, Spinner, Card } from "react-bootstrap";
import PostItem from "./blog-item/PostItem";
import React, { SetStateAction, useEffect, Dispatch } from "react";
import Loader from "../loader/Loader";
import { Post } from "../../dto";

interface BlogListProps {
  posts: Post[];
  isLoading: boolean;
}

const BlogList: React.FC<BlogListProps> = ({
  posts,
  isLoading,
}) => {
  return posts ? (
    <Row id="blogList" className="blogList justify-content-center">
      {isLoading ? (
        <div className="loader">
          <Spinner animation="border" />{" "}
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <Col key={post.id} md={12} lg={12} style={{ padding: "0px" }}>
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
