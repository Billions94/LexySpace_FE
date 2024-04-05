import { Dispatch } from 'redux';
import API from '../../lib/API';
import { Note, Token, User } from '../interfaces';

export enum Actions {
  SAVE_USER = 'SAVE_USER',
  GET_USERS = 'GET_USERS',
  GET_POSTS = 'GET_POSTS',
  GET_POST_BY_ID = 'GET_POST_BY_ID',
  GET_FOLLOWERS = 'GET_FOLLOWERS',
  SET_COVER = 'SET_COVER',
  GET_COVER = 'GET_COVER',
  TOGGLE_FOLLOW = 'TOGGLE_FOLLOW',
  TOGGLE_HIDE_ME = 'TOGGLE_HIDE_ME',
  TOGGLE_LIKE = 'TOGGLE_LIKE',
  TOGGLE_REROUTE = 'TOGGLE_REROUTE',
  TOGGLE_LOADER = 'TOGGLE_LOADER',
  SAVE_NOTES = 'SAVE_NOTES',
  DELETE_NOTE = 'DELETE_NOTE',
  TOGGLE_HIDE_TASK = 'TOGGLE_HIDE_TASK',
  UPDATE_FOLLOWERS_STATE = 'UPDATE_FOLLOWERS_STATE',
  GET_FOLLOWERS_STATE = 'GET_FOLLOWERS_STATE',
  SET_DYNAMIC_ID = 'SET_DYNAMIC_ID',
  SET_TOKENS = 'SET_TOKENS',
  GET_TOKENS = 'GET_TOKENS',
}

export function setTokenAction(payload: Token): (dispatch: Dispatch) => void {
  return function (dispatch) {
    try {
      dispatch({
        type: Actions.SET_TOKENS,
        payload,
      });
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function getTokensAction(): (dispatch: Dispatch) => void {
  return function (dispatch) {
    dispatch({ type: Actions.GET_TOKENS });
  };
}

export const saveUserAction = (
  payload: User
): ((dispatch: Dispatch) => void) => {
  return async function (dispatch) {
    try {
      dispatch({
        type: Actions.SAVE_USER,
        payload,
      });
    } catch (e) {
      console.error(e);
    }
  };
};

export const getUsersAction = (
  userId?: string
): ((dispatch: Dispatch) => void) => {
  return async function (dispatch) {
    try {
      const { data } = await API.get<User>(
        userId ? `/users/${userId}` : '/users/current-user',
        {
          params: { filter: 'verified' },
        }
      );
      if (data) {
        dispatch({
          type: Actions.GET_USERS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPosts = (): ((dispatch: Dispatch) => void) => {
  return async function (dispatch) {
    try {
      const { data } = await API.get(`/posts`);
      if (data) {
        const { posts } = data;
        const newPost = posts.reverse();
        dispatch({
          type: Actions.GET_POSTS,
          payload: newPost,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostById = (
  id: string | undefined
): ((dispatch: Dispatch) => Promise<any>) => {
  return async function (dispatch) {
    try {
      const { data } = await API.get(`/posts/${id}`);
      const { posts } = data;

      dispatch({
        type: Actions.GET_POST_BY_ID,
        payload: posts,
      });

      return posts;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getFollowersAction = (
  userId: string | undefined
): ((dispatch: Dispatch) => void) => {
  return async (dispatch) => {
    try {
      const { data } = await API.get(`/users/${userId}/followers`);
      if (data) {
        dispatch({
          type: Actions.GET_FOLLOWERS,
          payload: data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateFollowersState = (
  payload: User | User[] | undefined
): ((dispatch: Dispatch) => boolean) => {
  return function (dispatch) {
    dispatch({
      type: Actions.UPDATE_FOLLOWERS_STATE,
      payload,
    });
    return true;
  };
};

export const getFollowersState = (): ((dispatch: Dispatch) => void) => {
  return function (dispatch) {
    dispatch({
      type: Actions.GET_FOLLOWERS_STATE,
    });
  };
};

export const setDynamicId = (
  payload: string | undefined
): ((dispatch: Dispatch) => void) => {
  return function (dispatch) {
    dispatch({
      type: Actions.SET_DYNAMIC_ID,
      payload,
    });
  };
};

export const setCover = (payload: string): ((dispatch: Dispatch) => void) => {
  return function (dispatch) {
    dispatch({
      type: Actions.SET_COVER,
      payload,
    });
  };
};

export const getCover = (): ((dispatch: Dispatch) => void) => {
  return function (dispatch) {
    dispatch({
      type: Actions.GET_COVER,
    });
  };
};

export const followAction = (payload: boolean) => ({
  type: Actions.TOGGLE_FOLLOW,
  payload,
});

export const hideMeAction = (payload: boolean) => ({
  type: Actions.TOGGLE_HIDE_ME,
  payload,
});

export const likeAction = (payload: User) => ({
  type: Actions.TOGGLE_LIKE,
  payload,
});

export const reRouteAction = (payload: boolean) => ({
  type: Actions.TOGGLE_REROUTE,
  payload,
});

export const loaderAction = (payload: boolean) => ({
  type: Actions.TOGGLE_LOADER,
  payload,
});

export const hideNotesAction = (payload: boolean) => ({
  type: Actions.TOGGLE_HIDE_TASK,
  payload,
});

export const saveNoteAction = (payload: Note) => ({
  type: Actions.SAVE_NOTES,
  payload,
});

export const deleteNoteAction = (payload: Note) => ({
  type: Actions.DELETE_NOTE,
  payload,
});
