import { Dispatch, SetStateAction, useEffect } from "react";
import Loader from "../loader/Loader";
import { Post, Comment, User } from "../../redux/interfaces";
import { useDispatch } from "react-redux";
import { getUsersAction } from "../../redux/actions";
import SingleComment from "./SingleComment";
import "./styles.scss";

interface CommentsProps {
  author: User | null;
  blog: Post | null;
  id: string | undefined;
  comments: Comment[];
  fetchComments: () => Promise<void>;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}

const CommentComponent = ({
  blog,
  id,
  comments,
  fetchComments,
  setComments,
}: CommentsProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchComments();
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return comments ? (
    <>
      <div>
        {comments.map((c) =>
          c.postId !== blog?._id ? null : (
            <SingleComment
              id={id}
              blog={blog}
              comment={c}
              comments={comments}
              fetchComments={fetchComments}
              setComments={setComments}
            />
          )
        )}
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default CommentComponent;
