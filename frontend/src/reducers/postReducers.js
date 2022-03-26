import {
    GET_ALLPOSTS_REQUEST,
    GET_ALLPOSTS_SUCCESS,
    GET_ALLPOSTS_FAIL,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    LIKE_POST_FAIL,
  } from "../constants/postConstants";

export const getAllPostsReducer = (state = { posts:[] }, action) => {
    switch (action.type) {
      case GET_ALLPOSTS_REQUEST:
        return { ...state, loading: true };
      case GET_ALLPOSTS_SUCCESS:
        return {...state, loading: false, posts:action.payload };
      case GET_ALLPOSTS_FAIL:
        return { ...state,loading: false, error:action.payload };
      
      default:
        return state;
    }
  };
  
  export const likePostsReducer = (state = { message:'' }, action) => {
    switch (action.type) {
      case LIKE_POST_REQUEST:
        return { ...state, loading: true };
      case LIKE_POST_SUCCESS:
        return {...state, loading: false, message:action.payload };
      case LIKE_POST_FAIL:
        return { ...state,loading: false, error:action.payload };
      
      default:
        return state;
    }
  };
  

