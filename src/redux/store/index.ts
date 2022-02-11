import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage/session"
import { encryptTransform } from "redux-persist-transform-encrypt"
import usersReducer from "../reducers/dataReducer"
import postsReducer from "../reducers/postsReducer"
import { Posts, ReduxState, User } from "../interfaces"

const defaultCover: string = 'https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-mj9i8cmdi35dsqiqgumar4cu74-20170925171720.Medi.jpeg'


const ghost = process.env.REACT_APP_SECRET_KEY!
const allCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Initial state of the store
export const initialState: ReduxState = {
    data: {
        user: <User>{},
        followers: [],
        cover: defaultCover,
        following: false,
        hideMe: false,
        likes: [],
        reroute: false,
        isLoading: true,
        tasks: '',
        hideTask: false
    },
    posts: <Posts[]>[]
}

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
    transforms: [
        encryptTransform({
            secretKey: ghost
        })
    ]
}

// All reducers
const allReducers = combineReducers({
    data: usersReducer,
    posts: postsReducer
})

// Persist reducer
const persistedReducer = persistReducer(persistConfig, allReducers)

// Store
const store = createStore(persistedReducer, initialState, allCompose(applyMiddleware(thunk)))

export default store 

export const persistor = persistStore(store)