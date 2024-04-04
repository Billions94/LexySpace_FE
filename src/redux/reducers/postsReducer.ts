import { AnyAction } from 'redux';
import { Actions } from '../actions';
import { initialState } from '../store';

const postsReducer = (state = initialState.data, action: AnyAction) => {
  const { type, payload } = action;
  switch (type) {
    case Actions.GET_POSTS:
      return {
        ...state,
        posts: payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
