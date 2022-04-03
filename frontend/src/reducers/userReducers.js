import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  RECOMMENDED_FRIENDS_REQUEST,
  RECOMMENDED_FRIENDS_SUCCESS,
  RECOMMENDED_FRIENDS_FAIL,
  RECOMMENDED_FRIENDS_RESET,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  FOLLOW_USER_RESET,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UNFOLLOW_USER_RESET,
  USER_FRIENDS_REQUEST,
  USER_FRIENDS_SUCCESS,
  USER_FRIENDS_FAIL,
  USER_FRIENDS_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false,success:true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return {...state, loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return {...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};


export const userFriendsReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_FRIENDS_REQUEST:
      return { ...state, loading: true };
    case USER_FRIENDS_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_FRIENDS_FAIL:
      return { loading: false, error: action.payload };
    case USER_FRIENDS_RESET:
      return { };
    default:
      return state;
  }
};


export const recommendedFriendsReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case RECOMMENDED_FRIENDS_REQUEST:
      return { ...state, loading: true };
    case RECOMMENDED_FRIENDS_SUCCESS:
      return { loading: false,success:true, users: action.payload };
    case RECOMMENDED_FRIENDS_FAIL:
      return { loading: false, error: action.payload };
    case RECOMMENDED_FRIENDS_RESET:
      return {};
    default:
      return state;
  }
};


export const followUserReducer = (state = { message:''}, action) => {
  switch (action.type) {
    case FOLLOW_USER_REQUEST:
      return { ...state, loading: true };
    case FOLLOW_USER_SUCCESS:
      return { loading: false,success:true, message: action.payload };
    case FOLLOW_USER_FAIL:
      return { loading: false, error: action.payload };
    case FOLLOW_USER_RESET:
      return { };
    default:
      return state;
  }
};




export const unfollowUserReducer = (state = { message:''}, action) => {
  switch (action.type) {
    case UNFOLLOW_USER_REQUEST:
      return { ...state, loading: true };
    case UNFOLLOW_USER_SUCCESS:
      return { loading: false,success:true, message: action.payload };
    case UNFOLLOW_USER_FAIL:
      return { loading: false, error: action.payload };
    case UNFOLLOW_USER_RESET:
      return {};
    default:
      return state;
  }
};




