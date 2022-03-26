import {
  GET_ALLPOSTS_REQUEST,
  GET_ALLPOSTS_SUCCESS,
  GET_ALLPOSTS_FAIL,
  GET_USER_POSTS_REQUEST,
  GET_USER_POSTS_SUCCESS,
  GET_USER_POSTS_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
} from "../constants/postConstants";

import axios from "axios";

export const getAllPosts = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALLPOSTS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/posts/timeline/${id}`, config);
    dispatch({
      type: GET_ALLPOSTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALLPOSTS_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const likePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/posts/${id}/like`,{},config);
    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
