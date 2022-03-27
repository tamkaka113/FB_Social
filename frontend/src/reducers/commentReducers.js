import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_RESET,
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
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, newComment: action.payload };
    case CREATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};


export const deleteCommentReducer = (state = { message: '' }, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMMENT_SUCCESS:
      return { ...state, loading: false,success:true, message: action.payload };
    case CREATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_COMMENT_RESET:
        return { ...state,loading: false,success:false, error: action.payload };
  

    default:
      return state;
  }
};
