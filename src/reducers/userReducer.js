import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_LOAD_FAILED,
} from '../constants/userLoginConstants'

export const userLoginReducer = (state = {
  loading: false,
}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return { loading: false, userInfo: undefined };
    case USER_LOAD_FAILED:
      return { loading: false, userInfo: undefined };
    default:
      return state;
  }
}