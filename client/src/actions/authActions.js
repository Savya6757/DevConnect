import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SET_ALERT,
  USER_AUTHENTICATED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "../actions/types";
import setToken from "../utils/userLoded";

import { setAlert } from "./alertActions";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({ type: USER_AUTHENTICATED, payload: res.data });
  } catch (e) {
    dispatch({ type: AUTH_FAILED });
  }
};

export const registerAction =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ name, email, password });
      const res = await axios.post("/api/user", body, config);

      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
      dispatch(loadUser());
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };

export const loginAction =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const res = await axios.post("/api/auth", body, config);

      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      dispatch(loadUser());
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      }
      dispatch({ type: LOGIN_FAIL });
    }
  };
