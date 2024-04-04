import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import dataReducer from '../reducers/dataReducer';
import { ReduxState, User } from '../interfaces';
import { defaultCover } from '../../assets/icons';

const allCompose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState: ReduxState = {
  data: {
    user: <User>{},
    followers: [],
    dynamicId: '',
    cover: defaultCover,
    following: false,
    hideMe: false,
    likes: [],
    reroute: false,
    isLoading: true,
    notes: [],
    hideTask: false,
    posts: [],
    tokens: null,
  },
};

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: <string>process.env.REACT_APP_SECRET_KEY,
    }),
  ],
};

// All reducers of the application
const allReducers = combineReducers({
  data: dataReducer,
  //posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

// Redux Store
const store = createStore(
  persistedReducer,
  initialState,
  allCompose(applyMiddleware(thunk))
);

export default store;
export const persistor = persistStore(store);
export const getDynamicIdFromRedux = () => store.getState().data.dynamicId;
export const retrieveAccessToken = () => store.getState().data.tokens;
export const localDispatcher = (payload: any, type: string): (() => void) => {
  return function () {
    store.dispatch({
      type,
      payload,
    });
  };
};
