import { useState, FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Post } from '../../../redux/interfaces';
import { ReduxState } from '../../../redux/interfaces';
import { DropDown } from './DropDown';
import { SharedPost } from './SharedPost';
import { InteractionButtons } from './InteractionButtons';
import { PostDetails } from './PostDetails';
import './styles.scss';
import React from 'react';

interface Props {
  post: Post;
  postId: string;
}

const PostItem: FC<Props> = ({ post }) => {
  const [smShow, setSmShow] = useState(false);
  const [reload, setReload] = useState(false);

  const { posts } = useSelector((state: ReduxState) => state['data']);
  const { user: newUser } = useSelector((state: ReduxState) => state['data']);

  const newPost = posts?.find((p) => p.id === post?.id);
  const me = newUser?.id;

  const dropDownProps = {
    me,
    post,
    reload,
    setReload,
    smShow,
    setSmShow,
  };

  const sharedPostProps = {
    newPost: newPost as Post,
    post,
  };

  const interactionButtonProps = {
    me,
    post,
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ border: '1px solid rgb(216, 215, 215)' }}
        key={post.id}
        className="blog-card"
      >
        <DropDown data={dropDownProps} />
        <PostDetails post={post} />
        <SharedPost data={sharedPostProps} />
        <InteractionButtons data={interactionButtonProps} />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default PostItem;
