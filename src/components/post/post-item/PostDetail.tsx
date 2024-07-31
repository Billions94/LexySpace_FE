import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reRouteAction, setPostIdAction } from '../../../redux/actions';
import { Post } from '../../../redux/interfaces';

interface Props {
  post?: Post;
}

export const PostDetails: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const route = (id: string) => {
    navigate(`/posts/${id}`);
    dispatch(setPostIdAction(id));
    dispatch(reRouteAction(true));
  };

  return (
    <div onClick={() => route(String(post?.id))} className="blog-link">
      <div className="d-flex postBody">
        <div>
          <h6>{post?.text}</h6>
          <React.Fragment>
            {!post?.media
              ? null
              : post.media &&
                post.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`heic|png|jpg|gif|pdf|jpeg`) && (
                  <div className="post-detail-image-container">
                    {' '}
                    <LazyLoadImage
                      src={post.media}
                      className="post-detail-image-list "
                      alt=""
                    />
                  </div>
                )}
            {!post?.media
              ? null
              : post?.media &&
                post?.media
                  .split('.')
                  .slice(-1)
                  .join()
                  .match(`mp4|MPEG-4|mkv`) && (
                  <video
                    src={post?.media}
                    className="blog-video"
                    controls
                    autoPlay
                    muted
                  ></video>
                )}
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};
