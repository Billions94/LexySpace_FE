import React from 'react';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reRouteAction } from '../../../redux/actions';
import { Post } from '../../../redux/interfaces';
import PostAuthor from '../author/PostAuthor';

interface Props {
  data: {
    newPost: Post;
    post: Post;
  };
}

export const SharedPost: React.FC<Props> = ({ data }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { newPost, post } = data;
  console.log({ newPost });

  const route = (postId: string) => {
    navigate(`/posts/${postId}`);
    dispatch(reRouteAction(true));
  };

  return (
    <React.Fragment>
      {newPost?.sharedPost && newPost?.sharedPost?.id !== post.id ? (
        <div className="sharePostDiv">
          <div className="sharePost pt-3">
            <div className="d-flex">
              <PostAuthor {...post.user} /> <div></div>
            </div>
            <div onClick={() => route(post.id)} className="blog-link">
              <Card.Title>{newPost?.sharedPost.text}</Card.Title>
              {!newPost?.sharedPost
                ? null
                : newPost?.sharedPost.media &&
                  newPost?.sharedPost.media
                    .split('.')
                    .slice(-1)
                    .join()
                    .match(`heic|png|jpg|pdf|jpeg`) && (
                    <Card.Img
                      variant="top"
                      src={newPost?.sharedPost?.media}
                      className="blog-cover"
                    />
                  )}
              {!newPost?.sharedPost
                ? null
                : newPost?.sharedPost?.media &&
                  newPost?.sharedPost?.media
                    .split('.')
                    .slice(-1)
                    .join()
                    .match(`mp4|MPEG-4|mkv`) && (
                    <video
                      src={newPost?.sharedPost?.media}
                      className="blog-video"
                      controls
                      autoPlay
                      muted
                    ></video>
                  )}
              <Card.Body className="mb-0"></Card.Body>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};
