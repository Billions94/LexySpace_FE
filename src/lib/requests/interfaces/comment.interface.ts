import { SetStateAction } from "react";
import { Comment } from "../../../redux/interfaces";

export interface CreateComment {
  media: string;
  comment: CommentBody;
  setComment: React.Dispatch<
    React.SetStateAction<{
      content: string;
      user: string;
    }>
  >;
  userId: string;
  postId: string;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
}

export interface CommentBody {
  content: string;
  user: string;
}

export interface UpdateComment extends Omit<CreateComment, "postId"> {
  commentId: string;
}

export interface DeleteComment {
  commentId: string;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
}
