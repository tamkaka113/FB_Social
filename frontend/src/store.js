import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  recommendedFriendsReducer,
  followUserReducer,
  unfollowUserReducer,
  userFriendsReducer,
  userUpdateProfileReducer,
  usersInfoReducer,
} from "./reducers/userReducers";

import {
  getAllPostsReducer,
  likePostsReducer,
  createPostReducer,
  updatePostReducer,
  deletePostReducer,

} from "./reducers/postReducers";

import {
  createCommentReducer,
  editCommentReducer,
  deleteCommentReducer,
  likeCommentReducer,
  replyCommentReducer,
} from "./reducers/commentReducers";

import {
  createConversationReducer,
  createMessageReducer,
  getMessageReducer,
  getConversationReducer
} from "./reducers/messageReducers";
const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetail: userDetailsReducer,
  userFriends:userFriendsReducer,
  usersInfo:usersInfoReducer,
  getAllPosts: getAllPostsReducer,
  likePost: likePostsReducer,
  createComment: createCommentReducer,
  editComment: editCommentReducer,
  deleteComment: deleteCommentReducer,
  likeComment: likeCommentReducer,
  replyComment: replyCommentReducer,
  createPost: createPostReducer,
  updatePost: updatePostReducer,
  deletePost: deletePostReducer,
  recommendedFriends: recommendedFriendsReducer,
  followUser: followUserReducer,
  unfollowUser: unfollowUserReducer,
  userUpdateProfile:userUpdateProfileReducer,
  createConversation:createConversationReducer,
  getConversation:getConversationReducer,
  createMessage:createMessageReducer,
  getMessages:getMessageReducer,

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
