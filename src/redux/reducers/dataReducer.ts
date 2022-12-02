import { AnyAction } from "redux";
import { GET_USERS, GET_FOLLOWERS, TOGGLE_FOLLOW, TOGGLE_HIDE_ME, TOGGLE_LIKE, TOGGLE_REROUTE, TOGGLE_LOADER, SET_COVER, TOGGLE_HIDE_TASK, SAVE_TASKS } from "../actions";
import { initialState } from "../store";

const usersReducer = (state = initialState.data, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                user: payload
            }
        case GET_FOLLOWERS:
            return {
                ...state,
                followers: payload
            }
        case SET_COVER:
            return {
                ...state,
                cover: payload
            }
        case TOGGLE_FOLLOW:
            return {
                ...state,
                following: payload
            }
        case TOGGLE_HIDE_ME:
            return {
                ...state,
                hideMe: payload
            }
        case SAVE_TASKS:  
            return {
                ...state,
                tasks: payload
            }
        case TOGGLE_HIDE_TASK: 
            return {
                ...state,
                hideTask: payload
            }
        case TOGGLE_REROUTE:
            return {
                ...state,
                reroute: payload
            }
        case TOGGLE_LOADER:
            return {
                ...state,
                isLoading: payload
            }            
        default: return state
    }
}

export default usersReducer