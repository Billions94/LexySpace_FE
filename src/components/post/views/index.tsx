import React from 'react';
import { useSelector } from 'react-redux';
import LikesModal from '../../../components/Home/views/LikesModal';
import ViewModal from '../../../components/Home/views/ViewModal';
import { Post } from '../../../redux/interfaces';
import { GET_STORE } from '../../../redux/store';
import { CommentLength } from '../comment/CommentLength';
import { LikeImage } from '../likes/LikeImage';
import { LikeLength } from '../likes/LikeLength';
import { InteractionButtons } from '../post-item/InteractionButtons';
import { SharedPost } from '../post-item/SharedPost';

interface PostLayoutProps {
  view: boolean;
  setView: React.Dispatch<React.SetStateAction<boolean>>;
  post: Post;
  likeShow: boolean;
  setLikeShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PostLayout: React.FC<
  React.PropsWithChildren<unknown> & PostLayoutProps
> = ({ children, post, view, setView, likeShow, setLikeShow }) => {
  const {
    data: { user, posts },
  } = useSelector(GET_STORE);

  const newPost = posts?.find((p) => p.id === post?.id);

  const sharedPostProps = {
    newPost: newPost as Post,
    post,
  };

  return (
    <React.Fragment>
      {children}
      <SharedPost {...{ ...sharedPostProps }} />
      <div className="interactionContainer d-flex mt-2">
        <ViewModal
          view={view}
          setView={setView}
          cover={post?.media}
          post={post}
        />
        <div className="d-flex justify-content-evenly">
          <div className="likes">
            <LikeImage {...{ post, setLikeShow }} />
            <LikesModal
              likeShow={likeShow}
              setLikeShow={setLikeShow}
              post={post}
            />

            <LikeLength {...{ post }} />
          </div>

          <div className="comments ml-2">
            <CommentLength {...{ post }} />
          </div>
        </div>

        <InteractionButtons {...{ me: user.id, post, className: 'spacing' }} />
      </div>
    </React.Fragment>
  );
};
