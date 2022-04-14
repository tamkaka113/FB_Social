import {
  GET_ALLPOSTS_REQUEST,
  GET_ALLPOSTS_SUCCESS,
  GET_ALLPOSTS_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_RESET,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CREATE_POST_RESET,
  UPDATE_POST_RESET,
  DELETE_POST_RESET,
} from "../constants/postConstants";

export const createPostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case CREATE_POST_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_POST_RESET:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};

export const updatePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case UPDATE_POST_REQUEST:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return { ...state, loading: false, success: true, post: action.payload };
    case UPDATE_POST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_POST_RESET:
      return {};
    default:
      return state;
  }
};

export const deletePostReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case DELETE_POST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case DELETE_POST_RESET:
      return {};
    default:
      return state;
  }
};
export const getAllPostsReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_ALLPOSTS_REQUEST:
      return { ...state, loading: true };
    case GET_ALLPOSTS_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case GET_ALLPOSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const likePostsReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { ...state, loading: true };
    case LIKE_POST_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case LIKE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LIKE_POST_RESET:
      return {};

    default:
      return state;
  }
};
