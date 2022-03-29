import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_RESET,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  EDIT_COMMENT_RESET,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  LIKE_COMMENT_RESET,
} from "../constants/commentContants";

export const createCommentReducer = (state = { comment: {} }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, comment: action.payload };
    case CREATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};

export const editCommentReducer = (state = { newComment: {} }, action) => {
  switch (action.type) {
    case  EDIT_COMMENT_REQUEST:
      return { ...state, loading: true };
    case EDIT_COMMENT_SUCCESS:
      return { ...state, loading: false, success:true, newComment: action.payload };
    case EDIT_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case EDIT_COMMENT_RESET:
        return { ...state,loading: false,success:false};
  

    default:
      return state;
  }
};


export const deleteCommentReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case DELETE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, message: action.payload };
    case DELETE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case DELETE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};


export const likeCommentReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case LIKE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case LIKE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, message: action.payload };
    case LIKE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LIKE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};


export const replyCommentReducer = (state = { comments:[] }, action) => {
  switch (action.type) {
    case LIKE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case LIKE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, comments: action.payload };
    case LIKE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LIKE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};
