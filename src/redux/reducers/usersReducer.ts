import { AnyAction } from "redux";
import { GET_USERS, GET_FOLLOWERS, TOGGLE_FOLLOW, TOGGLE_HIDE_ME } from "../actions";
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
        default: return state
    }
}

export default usersReducer