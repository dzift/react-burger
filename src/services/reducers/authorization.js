import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../actions/authorization";

const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  accessToken: "Bearer ...",
  refreshToken: "",
  requestInProgress: false,
  requestError: false,
};

export const reducerAuthorization = (state = initialState, action) => {
  switch (action.type) {
    //регистрация начало
    case REGISTER_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        requestError: false,
        user: {
          email: action.user.email,
          name: action.user.name,
        },
      };
    case REGISTER_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //регистрация конец

    //авторизация начало
    case LOGIN_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        requestError: false,
        user: {
          email: action.user.email,
          name: action.user.name,
        },
      };
    case LOGIN_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //авторизация конец

    default:
      return state;
  }
};
