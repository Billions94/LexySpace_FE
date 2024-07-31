import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Post } from 'src/redux/interfaces';

export const LikeImage: React.FC<{
  post: Post;
  setLikeShow: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ post, setLikeShow }) => (
  <React.Fragment>
    {post.likes?.length > 0 &&
      post.likes.slice(0, 2).map((user) => (
        <div className="singleImage">
          <LazyLoadImage
            className="likeImg"
            src={user?.image}
            alt=""
            width={20}
            height={20}
            onClick={() => setLikeShow(true)}
          />
        </div>
      ))}
  </React.Fragment>
);
