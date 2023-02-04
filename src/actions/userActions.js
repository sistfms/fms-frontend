import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOAD_FAILED,
  USER_LOGOUT_REQUEST,
} from '../constants/userLoginConstants';
import { GATEWAY_URL } from '../constants'
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'WithCredentials': true,
      },
    };

    const { data } = await axios.post(`/api/login`, {email, password}, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'WithCredentials': true,
      },
    };

    const { data } = await axios.get(`/api/refresh`, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("login Error", error)
    dispatch({
      type: USER_LOAD_FAILED,
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST
  })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'WithCredentials': true,
      },
    };
    const res = await axios.get(`/api/logout`, {}, config);
    dispatch({
      type: USER_LOGOUT
    })
    window.reload();
  } catch (error) {
    console.log("logout error", error)
  }
}
  