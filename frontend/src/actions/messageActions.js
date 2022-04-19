import axios from "axios";
import {
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAIL,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_CON_BYID_SUCCESS,
  GET_CON_BYID_REQUEST,
  GET_CON_BYID_FAIL,
} from "../constants/messageContants";

export const createConversation =
  (conversation) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_CONVERSATION_REQUEST,
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
        `/api/v1/conversations`,
        conversation,
        config
      );
      dispatch({
        type: CREATE_CONVERSATION_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CREATE_CONVERSATION_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const getConversations = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONVERSATION_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/conversations/${id}`, config);
    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getConversationById =
  (currentId, id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_CON_BYID_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/v1/conversations/${currentId}/c/${id}`,
        config
      );
      dispatch({
        type: GET_CON_BYID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_CON_BYID_FAIL,
        payload: error.response?.data.message || error.message,
      });
    }
  };

export const createMessages = (message) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_MESSAGE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/v1/messages`, message, config);
    dispatch({
      type: CREATE_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_MESSAGE_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};

export const getMessages = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MESSAGES_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/v1/messages/${id}`, config);

    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
