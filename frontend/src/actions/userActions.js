import axios from "axios";

import {

  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,

  USER_DETAILS_SUCCESS,
  USER_FRIENDS_REQUEST,
  USER_FRIENDS_SUCCESS,
  USER_FRIENDS_FAIL,
  RECOMMENDED_FRIENDS_REQUEST,
  RECOMMENDED_FRIENDS_SUCCESS,
  RECOMMENDED_FRIENDS_FAIL,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAIL,
  UNFOLLOW_USER_RESET,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,

} from "../constants/userConstants";

export const login = (email, password) => async (dispatch) => {

  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Conent-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Conent-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/users/register",
      { username, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};


export const getUserDetails = (id) => async (dispatch, getState) => {

 
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users/${id}`, config)



    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}


export const updateUserProfile = (id,content) => async (dispatch, getState) => {

 
  try {
    dispatch({
      type: UPDATE_PROFILE_RESET,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.patch(`/api/v1/users/${id}`,content, config)



    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type:UPDATE_PROFILE_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}



export const getUserFriends = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_FRIENDS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users/friends/${id}`, config)

    dispatch({
      type: USER_FRIENDS_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type: USER_FRIENDS_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}



export const getRecommendedFriends = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECOMMENDED_FRIENDS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/v1/users`, config)

    dispatch({
      type: RECOMMENDED_FRIENDS_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type: RECOMMENDED_FRIENDS_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}



export const followUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type:FOLLOW_USER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/v1/users/${id}/follow`,{}, config)

    dispatch({
      type: FOLLOW_USER_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type: FOLLOW_USER_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}



export const unFollowUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type:UNFOLLOW_USER_RESET,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/v1/users/${id}/unfollow`,{}, config)

    dispatch({
      type: UNFOLLOW_USER_SUCCESS,
      payload: data,
    })
 

  } catch (error) {
    dispatch({
      type: UNFOLLOW_USER_FAIL,
      payload: error.response.data.message || error.message,
    })
  }
}


