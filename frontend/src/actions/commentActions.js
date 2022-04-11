import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  REPLY_COMMENT_REQUEST,
  REPLY_COMMENT_SUCCESS,
  REPLY_COMMENT_FAIL,
} from "../constants/commentContants";
import axios from "axios";

export const createComment = (comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/comments`, comment, config);
    dispatch({
      type: CREATE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const editComment = (id, content) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/v1/comments/${id}`,
      { content },
      config
    );
    dispatch({
      type: EDIT_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const deleteComment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.delete(`/api/v1/comments/${id}`, config);
    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const likeComment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIKE_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/comments/${id}`, {}, config);
    dispatch({
      type: LIKE_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIKE_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const replyComment = (id, comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPLY_COMMENT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/v1/comments/${id}/reply`,
      comment,
      config
    );
    dispatch({
      type: REPLY_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REPLY_COMMENT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
