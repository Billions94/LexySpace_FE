import { AnyAction } from "redux";
import { GET_BLOGS } from "../actions";
import { initialState } from "../store";

const postsReducer = (state = initialState.posts, action: AnyAction) => {
    const { type, payload } = action;
    switch(type) {
        case GET_BLOGS: 
        return  payload  
        
       default: return state
    }
}

export default postsReducer