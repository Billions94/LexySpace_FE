import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { encryptTransform } from "redux-persist-transform-encrypt";
import usersReducer from "../reducers/dataReducer";
import postsReducer from "../reducers/postsReducer";
import { Post, ReduxState, User } from "../interfaces";
import { defaultCover } from "../../assets/icons";

const ghost = process.env.REACT_APP_SECRET_KEY!;
const allCompose =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cover = localStorage.getItem("cover") as string;

export const initialState: ReduxState = {
  data: {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    user: <User>{},
    followers: [],
    cover: cover ? cover : defaultCover,
    following: false,
    hideMe: false,
    likes: [],
    reroute: false,
    isLoading: true,
    tasks: "",
    hideTask: false,
  },
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  posts: <Post[]>[],
};

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: ghost,
    }),
  ],
};

const allReducers = combineReducers({
  data: usersReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = createStore(
  persistedReducer,
  initialState,
  allCompose(applyMiddleware(thunk))
);

export default store;

export const persistor = persistStore(store);



