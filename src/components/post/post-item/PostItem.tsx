import React, { FC, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { GET_STORE } from 'src/redux/store';
import { Post } from '../../../redux/interfaces';
import { DropDown } from './DropDown';
import { InteractionButtons } from './InteractionButtons';
import { PostDetails } from './PostDetail';
import { SharedPost } from './SharedPost';
import './styles.scss';

interface Props {
  postId: string;
}

const PostItem: FC<Props> = ({ postId }) => {
  const [smShow, setSmShow] = useState(false);
  const [reload, setReload] = useState(false);

  const {
    data: { posts, user: newUser },
  } = useSelector(GET_STORE);

  const post = posts.find((p) => p.id === postId);
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
        key={post?.id}
        className="blog-card"
      >
        <DropDown data={dropDownProps} />
        <PostDetails post={post} />
        <SharedPost {...{ ...sharedPostProps }} />
        <InteractionButtons {...{ ...interactionButtonProps }} />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default PostItem;
