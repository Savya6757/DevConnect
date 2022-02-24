import {
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_PROFILE,
  GET_REPO,
  PROFILE_FAILED,
  UPDATE_PROFILE,
} from "../actions/types";

const initialState = {
  profile: null,
  allProfiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_ALL_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
      };
    case GET_REPO:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default profileReducer;
