import React from 'react';
import { Post } from '../../../redux/interfaces';

export const LikeLength: React.FC<{ post: Post }> = ({ post }) => (
  <div>
    {post?.likes?.length > 1 ? (
      <span className="text-muted ml-1">{post?.likes?.length ?? 0} likes</span>
    ) : (
      <span className="text-muted ml-1">{post?.likes?.length ?? 0} like</span>
    )}
  </div>
);
