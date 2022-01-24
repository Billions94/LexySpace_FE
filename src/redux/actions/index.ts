import { Dispatch } from "redux";
import API from "../../lib/API"
import { User } from "../interfaces"

export const GET_USERS = 'GET_USERS'
export const GET_BLOGS = 'GET_BLOGS'
export const GET_FOLLOWERS = 'GET_FOLLOWERS'
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
export const TOGGLE_HIDE_ME = 'TOGGLE_HIDE_ME'
export const TOGGLE_LIKE = 'TOGGLE_LIKE'

export const apiUrl = process.env.REACT_APP_GET_URL



export const getUsersAction = () => {
    return async (dispatch: Dispatch) => {
        try {
            const { data } = await API.get<User>('/users/me')
            if(data) {
                dispatch({
                    type: GET_USERS,
                    payload: data
                })
            } else {
                throw new Error("Roger we've got a problem")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getPosts = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await fetch(`${apiUrl}/posts`)
            if (response.ok) {
              const { posts } = await response.json()
              const newPost = posts.reverse()
              dispatch({
                type: GET_BLOGS,
                payload: newPost
              })
            }
          } catch (error) {
            console.log(error)
          }
    }
}



export const getFollowersAction = (userId: string | undefined) => {
    return async (dispatch: Dispatch) => {
        try {
            const { data } = await API.get(`/users/${userId}/followers`)
            if(data) {
                dispatch({
                    type: GET_FOLLOWERS,
                    payload: data
                })
            } else {
                throw new Error("Roger we've got a problem")
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const followAction = (payload: boolean) => ({
    type: TOGGLE_FOLLOW,
    payload: payload
})

export const hideMeAction = (payload: boolean) => ({
    type: TOGGLE_HIDE_ME,
    payload: payload
})

export const likeAction = (payload: boolean) => ({
    type: TOGGLE_LIKE,
    payload: payload
})

