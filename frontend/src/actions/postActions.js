import {
  GET_ALLPOSTS_REQUEST,
  GET_ALLPOSTS_SUCCESS,
  GET_ALLPOSTS_FAIL,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  UPLOAD_IMAGE_REQUEST,
} from "../constants/postConstants";

import axios from "axios";

export const createPost = (content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/v1/posts`, content,config);
    dispatch({
      type: CREATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};


export const updatePost = (id,content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(`/api/v1/posts/${id}`, content,config);
    dispatch({
      type: UPDATE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};


export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_POST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/v1/posts/${id}`,config);
    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type:DELETE_POST_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

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
