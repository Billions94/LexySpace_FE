import React from "react";
import { Badge } from "react-bootstrap";
import { useDispatch } from "react-redux";
import API from "../../../lib/API";
import { getPosts } from "../../../lib/requests/post";
import { likeAction } from "../../../redux/actions";
import { Post } from "../../../redux/interfaces";
import CommentModal from "../../comment/new/CommentModal";
import SharePost from "../crud/SharePost";

interface Props {
  data: {
    me: string;
    post: Post;
  };
}

export const InteractionButtons: React.FC<Props> = ({ data }: Props) => {
  const { me, post } = data;
  const dispatch = useDispatch();
  const liker = { userId: me };

  const [commentLabel, setCommentLabel] = React.useState(false);
  const [likeLabel, setLikeLabel] = React.useState(false);
  const [shareLabel, setShareLabel] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const [share, setShare] = React.useState(false);

  const handleCommentLabelShow = () => setCommentLabel(true);
  const handleLikeLabelShow = () => setLikeLabel(true);
  const handleShareLabelShow = () => setShareLabel(true);

  const handleCommentLabelClose = () => setCommentLabel(false);
  const handleLikeLabelClose = () => setLikeLabel(false);
  const handleShareLabelClose = () => setShareLabel(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleShareShow = () => setShare(true);

  const like = async () => {
    try {
      await API.patch(`/posts/${post._id}/likes`, liker);

      getPosts(dispatch);
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = () => {
    like();
    dispatch(likeAction());
  };

  const unLikePost = () => {
    like();
    dispatch(likeAction());
  };

  const toggle = () => {
    !post.likes ? likePost() : unLikePost();
  };

  return (
    <div className="d-flex justify-content-around mt-1 mb-0">
      <div
        onMouseEnter={handleCommentLabelShow}
        onMouseLeave={handleCommentLabelClose}
        className="postition-relative"
      >
        <button className="candl" onClick={handleShow}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/comment-discussion.png"
            width="20px"
            alt=""
          />
        </button>
        <button className="text-dark btnX">
          <span>{post.comments.length}</span>
        </button>
        {commentLabel === false ? null : (
          <Badge pill variant="secondary" className="interactionBadge">
            Comment
          </Badge>
        )}
        <CommentModal
          id={post._id}
          show={show}
          setShow={setShow}
          handleClose={handleClose}
        />
      </div>
      <div
        onMouseEnter={handleLikeLabelShow}
        onMouseLeave={handleLikeLabelClose}
        onClick={() => toggle()}
        className="postition-relative"
      >
        {!post.likes.some((elem) => elem._id === me) ? (
          <>
            <button className="candl">
              <img
                className="interactions"
                src="https://img.icons8.com/ios-filled/50/ffffff/two-hearts.png"
                width="20px"
                alt=""
              />
            </button>
            <button className="text-dark btnX">
              <span>{post.likes.length}</span>
            </button>
            {likeLabel === false ? null : (
              <Badge pill variant="secondary" className="interactionBadge">
                Like
              </Badge>
            )}
          </>
        ) : (
          <>
            <button className="candl">
              <img
                className="interactions"
                src="https://img.icons8.com/color/50/ffffff/two-hearts.png"
                width="20px"
                alt=""
              />
            </button>
            <button className="text-dark btnX">
              <span>{post.likes.length}</span>
            </button>
            {likeLabel === false ? null : (
              <Badge pill variant="secondary" className="interactionBadge">
                Like
              </Badge>
            )}
          </>
        )}
      </div>
      <div
        onMouseEnter={handleShareLabelShow}
        onMouseLeave={handleShareLabelClose}
        className="postition-relative"
      >
        <button className="candl" onClick={handleShareShow}>
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/right2.png"
            width="20px"
            alt=""
          />
        </button>
        {shareLabel === false ? null : (
          <Badge pill variant="secondary" className="interactionBadge">
            Share
          </Badge>
        )}
        <SharePost
          id={post._id}
          user={post.user}
          show={share}
          setShow={setShare}
          createdAt={post.createdAt}
        />
      </div>
    </div>
  );
};
