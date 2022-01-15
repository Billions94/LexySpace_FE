import { AnyAction } from "redux";
import { GET_USERS } from "../actions";
import { GET_FOLLOWERS } from "../actions";
import { initialState } from "../store";

const usersReducer = (state = initialState.data, action: AnyAction) => {
    const { type, payload } = action;
    switch(type) {
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
       default: return state
    }
}

export default usersReducer