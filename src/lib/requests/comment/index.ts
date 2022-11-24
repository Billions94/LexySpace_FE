import API from "../../API";
import {
  CreateComment,
  DeleteComment,
  UpdateComment,
} from "../interfaces/comment.interface";

export const createComment = async (args: CreateComment) => {
  const { media, comment, setComment, userId, postId, setComments } = args;

  if (media) {
    try {
      const formData = new FormData();
      formData.append("text", comment.content);
      formData.append("media", media);

      const { data } = await API.post(`/comments/${postId}`, formData);
      if (data) {
        getComments(setComments);
        setComment({
          content: "",
          user: userId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data } = await API.post(`/comments/${postId}`, comment);

      if (data) {
        getComments(setComments);
        setComment({
          content: "",
          user: userId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const getComments = async (
  setComments: CreateComment["setComments"]
) => {
  try {
    const { data } = await API.get(`/comments`);
    if (data) {
      const { comments } = data;
      const commentsInDesc = comments.reverse();

      setComments(commentsInDesc);
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (args: UpdateComment) => {
  const { commentId, media, comment, setComment, userId, setComments } = args;

  try {
    if (media) {
      const formData = new FormData();
      formData.append("text", comment.content);
      formData.append("media", media);

      const { data } = await API.patch(`/comments/${commentId}`, formData);

      if (data) {
        getComments(setComments);
        setComment({
          content: "",
          user: userId,
        });
      }
    } else {
      const { data } = await API.patch(`/comments/${commentId}`, comment);

      if (data) {
        getComments(setComments);
        setComment({
          content: "",
          user: userId,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (args: DeleteComment) => {
  const { commentId, setComments } = args;

  try {
    const { data } = await API.delete(`/comments/${commentId}`);

    if (data) {
      getComments(setComments);
    }
  } catch (error) {
    console.log(error);
  }
};
