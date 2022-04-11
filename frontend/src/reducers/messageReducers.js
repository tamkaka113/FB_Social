import {
  CREATE_CONVERSATION_REQUEST,
  CREATE_CONVERSATION_SUCCESS,
  CREATE_CONVERSATION_FAIL,
  CREATE_MESSAGE_FAIL,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  GET_CONVERSATION_REQUEST,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAIL,
  CREATE_MESSAGE_RESET,
} from "../constants/messageContants";

export const createConversationReducer = (
  state = { conversation: [] },
  action
) => {
  switch (action.type) {
    case CREATE_CONVERSATION_REQUEST:
      return { ...state, loading: true };
    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        conversation: action.payload,
      };
    case CREATE_CONVERSATION_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getConversationReducer = (
  state = { conversation: [] },
  action
) => {
  switch (action.type) {
    case GET_CONVERSATION_REQUEST:
      return { ...state, loading: true };
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        conversation: action.payload,
      };
    case GET_CONVERSATION_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
export const createMessageReducer = (state = { message: [] }, action) => {
  switch (action.type) {
    case CREATE_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        message: action.payload,
      };
    case CREATE_MESSAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CREATE_MESSAGE_RESET:
      return {};

    default:
      return state;
  }
};

export const getMessageReducer = (state = { messages: [] }, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        messages: action.payload,
      };
    case GET_MESSAGES_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
