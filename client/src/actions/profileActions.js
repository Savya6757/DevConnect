import axios from "axios";
import { setAlert } from "./alertActions";
import {
  GET_PROFILE,
  PROFILE_FAILED,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_ALL_PROFILES,
  GET_REPO,
} from "./types";

export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getSingleProfile = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const getRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch({
      type: GET_REPO,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(formData);
      const res = await axios.post("/api/profile", body, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Successfully edited profile" : "Successfully created profile", "success")
      );
      navigate("/dashboard");
    } catch (e) {
      const errors = e.response.data.errors;
      if (errors) {
        errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      }
      dispatch({
        type: PROFILE_FAILED,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  };

export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/profile/experience", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Successfully added experience", "success"));
    navigate("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
    }
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.put("/api/profile/education", body, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Successfully added education", "success"));
    navigate("/dashboard");
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach((e) => dispatch(setAlert(e.msg, "danger")));
    }
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Successfully deleted experience", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert("Successfully deleted education", "success"));
  } catch (e) {
    dispatch({
      type: PROFILE_FAILED,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure, this will delete your account permanently!!")) {
    try {
      await axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Successfully deleted your account", "success"));
    } catch (e) {
      dispatch({
        type: PROFILE_FAILED,
        payload: { msg: e.response.statusText, status: e.response.status },
      });
    }
  }
};
