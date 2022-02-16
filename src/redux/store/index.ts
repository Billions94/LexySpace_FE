import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage/session"
import { encryptTransform } from "redux-persist-transform-encrypt"
import usersReducer from "../reducers/dataReducer"
import postsReducer from "../reducers/postsReducer"
import { Posts, ReduxState, User } from "../interfaces"

export const defaultCover: string = 'https://s3.ap-southeast-1.amazonaws.com/images.asianage.com/images/aa-Cover-mj9i8cmdi35dsqiqgumar4cu74-20170925171720.Medi.jpeg'
export const defaultAvatar: string = 'https://cdn-icons-png.flaticon.com/512/3508/3508549.png'
export const isTypingGif: string = 'https://thumbs.gfycat.com/WavyViciousIrishdraughthorse-max-1mb.gif'
export const conversationGif: string = 'http://armandoverduzco.com/images/dm.gif'
export const musicIcon: string = 'https://img.icons8.com/flat-round/64/ffffff/audio-wave.png'
export const playIcon: string = 'https://img.icons8.com/ios/64/ffffff/play--v1.png'
export const pauseIcon: string = 'https://img.icons8.com/ios/64/ffffff/pause--v1.png'
export const loadingNew: string = 'https://i.imgur.com/Pnw2Rh9.gif'


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