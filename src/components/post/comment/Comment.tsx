import React from 'react';
import { Post, User } from '../../../redux/interfaces';
import { useComments } from '../../hooks/useComments';
import Loader from '../../loader/Loader';
import SingleComment from './SingleComment';
import './styles.scss';

interface CommentsProps {
  author: User | null;
  post: Post | null;
  id: string | undefined;
}

const CommentComponent = ({ post, id }: CommentsProps) => {
  const { comments, setComments, fetchComments } = useComments();

  return comments ? (
    <div>
      {comments.map((c) =>
        c.postId !== post?.id ? null : (
          <SingleComment
            key={c.id}
            id={id}
            post={post as Post}
            comment={c}
            comments={comments}
            fetchComments={fetchComments}
            setComments={setComments}
          />
        )
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default CommentComponent;
