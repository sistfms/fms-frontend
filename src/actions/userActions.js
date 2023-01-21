import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOAD_FAILED,
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

    const { data } = await axios.post(`/login`, {email, password}, config);
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

    const { data } = await axios.get(`/refresh`, config);
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
    type: USER_LOGIN_REQUEST
  })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'WithCredentials': true,
      },
    };
    const res = await axios.get(`/logout`, {}, config);
    dispatch({
      type: USER_LOGOUT
    })
    if (res.status >= 200 && res.status < 400) {
      window.location.reload();
    }
  } catch (error) {
    console.log("logout error", error)
  }
}
  