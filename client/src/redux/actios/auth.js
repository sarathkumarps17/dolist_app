import {
  REGISTER_SUCSUSS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCSUSS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types";
import { setAlert } from "./alert";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { clearDolist } from "./doList";
import { loadDolist } from "./doList";
import { fetchCollection, clearCollection } from "./collection";

////////////////LOAD USER//////////////////////////////////

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
    try {
      const user = await axios.get("/login");
      dispatch({
        type: USER_LOADED,
        payload: user.data,
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAILED,
      });
    }
  }
};

////////////////////////////////LOGIN USER//////////////////////

export const login = ({ name, password }) => async (dispatch) => {
  try {
    let res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, password });
    res = await axios.post("/login", body, config);
    dispatch({
      type: LOGIN_SUCSUSS,
      payload: res.data,
    });
    dispatch(setAlert("You have Loged In", "success"));
    dispatch(loadUser());
    dispatch(fetchCollection());
    dispatch(loadDolist());
  } catch (err) {
    console.log(err.response.data.errors);
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: LOGIN_FAILURE });
  }
};

//////////////////////// REGISTER USER ////////////////////////////////

export const register = ({ name, password, passcode, isAdmin }) => async (
  dispatch
) => {
  try {
    let res;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, password, passcode, isAdmin });
    res = await axios.post("/register", body, config);
    dispatch({
      type: REGISTER_SUCSUSS,
      payload: res.data,
    });
    dispatch(setAlert("You Have Succsessfully Registered", "success"));
    dispatch(loadUser());
    dispatch(fetchCollection());
    dispatch(loadDolist());
  } catch (err) {
    console.log(err.response.data.errors);
    let errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: REGISTER_FAILURE });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch(setAlert("loged Out", "warning"));
  dispatch(clearCollection());
  dispatch(clearDolist());
};
