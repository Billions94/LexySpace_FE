import API from "../../API";
import { GET_BLOGS } from "../../../redux/actions";
import {
  CreateNewPost,
  SharePost,
  UpdatePost,
} from "../interfaces/post.interface";

export async function getPosts(dispatch: any) {
  try {
    const { data } = await API.get(`/posts`);
    if (data) {
      const { posts } = data;
      const newPost = posts.reverse();

      dispatch({
        type: GET_BLOGS,
        payload: newPost,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(args: CreateNewPost) {
  const {
    userName,
    media,
    setMedia,
    post,
    setPost,
    setFetchLoading,
    dispatch,
    setShow,
  } = args;

  if (media) {
    try {
      setFetchLoading && setFetchLoading(true);

      const formData = new FormData();
      formData.append("text", post.text);
      formData.append("media", media);

      const { data } = await API.post(`/posts/${userName}`, formData);

      if (setShow && data) {
        setPost({ text: "" });
        setMedia("");
        getPosts(dispatch);
        setShow(false);
      }

      if (data) {
        setPost({ text: "" });
        setMedia("");
        getPosts(dispatch);

        setTimeout(() => {
          setFetchLoading && setFetchLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      setFetchLoading && setFetchLoading(true);
      const { data } = await API.post(`/posts/${userName}`, post);

      if (setShow && data) {
        setPost({ text: "" });
        getPosts(dispatch);
        setShow(false);
      }

      if (data) {
        setPost({ text: "" });
        getPosts(dispatch);

        setTimeout(() => {
          setFetchLoading && setFetchLoading(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updatePost(args: UpdatePost) {
  const {
    post,
    media,
    postId,
    setShow,
    dispatch,
    refresh,
    setRefresh,
    setMedia,
  } = args;

  if (media) {
    try {
      const formData = new FormData();
      formData.append("text", post.text);
      formData.append("media", media);

      const { data } = await API.patch(`/posts/${postId}`, formData);

      if (data) {
        setShow(false);
        setMedia("");
        refresh === false ? setRefresh(true) : setRefresh(false);
        getPosts(dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data } = await API.patch(`/posts/${postId}`, post);

      if (data) {
        setShow(false);
        refresh === false ? setRefresh(true) : setRefresh(false);
        getPosts(dispatch);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function deletePost(postId: string, dispatch: any) {
  try {
    const { data } = await API.delete(`/posts/${postId}`);
    if (data) {
      getPosts(dispatch);
    }
  } catch (error) {
    console.log("ooops we encountered an error", error);
  }
}

export async function sharePost(args: SharePost) {
  const { media, userName, post, setShow, navigate, dispatch, setMedia } = args;

  if (media) {
    try {
      const formData = new FormData();
      formData.append("text", post.text);
      formData.append("media", media);

      const { data } = await API.post(`/posts/${userName}`, formData);

      if (data) {
        if (setShow) {
          setShow(false);
        }

        setMedia("");
        navigate("/home");
        getPosts(dispatch);
      } else {
        throw new Error("Unable to share post");
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { data } = await API.post(`/posts/${userName}`, post);

      if (data) {
        if (setShow) {
          setShow(false);
        }

        setMedia("");
        navigate("/home");
        getPosts(dispatch);
      } else {
        throw new Error("Unable to share post");
      }
    } catch (error) {
      console.log(error);
    }
  }
}
