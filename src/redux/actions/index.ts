import { Dispatch } from "redux";
import API from "../../lib/API"
import { User } from "../interfaces"

export const GET_USERS = 'GET_USERS'
export const GET_BLOGS = 'GET_BLOGS'
export const GET_FOLLOWERS = 'GET_FOLLOWERS'

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

