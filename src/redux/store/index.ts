import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage/session"
import { encryptTransform } from "redux-persist-transform-encrypt"
import usersReducer from "../reducers/usersReducer"
import postsReducer from "../reducers/postsReducer"
import { ReduxState } from "../interfaces"


const ghost = process.env.REACT_APP_SECRET_KEY!
const allCompose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 

// Initial state of the store
export const initialState: ReduxState = {
    data: {
        user: {},
        followers: []
    },
    posts: []
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
// const persistedReducer = persistReducer(persistConfig, allReducers)

// Store
const store = createStore(allReducers, initialState, allCompose(applyMiddleware(thunk)))

export default store 

// export const persistor = persistStore(store)