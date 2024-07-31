import React from 'react';
import { Post } from '../../../redux/interfaces';

export const CommentLength: React.FC<{ post: Post }> = ({ post }) => (
  <React.Fragment>
    {post?.comments?.length > 1 ? (
      <span className="text-muted">{post?.comments?.length ?? 0} comments</span>
    ) : (
      <span className="text-muted">{post?.comments?.length ?? 0} comment</span>
    )}
  </React.Fragment>
);
