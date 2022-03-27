import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

import {getAllPostsReducer,likePostsReducer} from './reducers/postReducers'

import {createCommentReducer,editCommentReducer,deleteCommentReducer} from './reducers/commentReducers'
const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailsReducer,
  getAllPosts:getAllPostsReducer,
  likePost:likePostsReducer,
  createComment:createCommentReducer,
  editComment:editCommentReducer,
  deleteComment:deleteCommentReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
