import {
  REGISTER_SUCSUSS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCSUSS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types";

const initialState = {
  loading: true,
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  let { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_SUCSUSS:
    case LOGIN_SUCSUSS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAILURE:
    case AUTH_FAILED:
    case LOGIN_FAILURE:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
}
