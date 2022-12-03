import { useState, FC } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Post } from "../../../redux/interfaces";
import { ReduxState } from "../../../redux/interfaces";
import { DropDown } from "./DropDown";
import { SharedPost } from "./SharedPost";
import { InteractionButtons } from "./InteractionButtons";
import { PostDetails } from "./PostDetails";
import "./styles.scss";

interface Props {
  post: Post;
  postId: string;
}

const PostItem: FC<Props> = ({ post }: Props) => {
  const [smShow, setSmShow] = useState(false);
  const [reload, setReload] = useState(false);

  const posts = useSelector((state: ReduxState) => state.posts);
  const newUser = useSelector((state: ReduxState) => state.data.user);

  const newPost = posts.find((p) => p._id === post._id)!;
  const me = newUser!._id;

  const dropDownProps = {
    me,
    post,
    reload,
    setReload,
    smShow,
    setSmShow,
  };

  const sharedPostProps = {
    newPost,
    post,
  };

  const interactionButtonProps = {
    me,
    post,
  };

  return (
    <ListGroup>
      <ListGroup.Item
        style={{ border: "1px solid rgb(216, 215, 215)" }}
        key={post._id}
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
