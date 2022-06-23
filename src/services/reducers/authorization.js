import {
  REGISTER_FAILED,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  TOKEN_SUCCESS,
  TOKEN_REQUEST,
  TOKEN_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
} from "../actions/authorization";

const initialState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  auth: false,
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
          ...state.user,
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

    //обновление токена начало
    case TOKEN_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case TOKEN_SUCCESS:
      return {
        ...state,
        auth: true,
        requestInProgress: false,
        requestError: false,
      };
    case TOKEN_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //обновление токена конец

    //обновление токена начало
    case LOGOUT_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        requestInProgress: false,
        requestError: false,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //обновление токена конец

    //запрос кода для забытого пароля начало
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        user: {
          email: action.email,
        },
        requestInProgress: false,
        requestError: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        user: {
          email: "",
        },
        requestInProgress: false,
        requestError: true,
      };
    //запрос кода для забытого пароля конец

    //сброс пароля  начало
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        user: {
          password: true,
        },
        requestInProgress: false,
        requestError: false,
      };
    case RESET_PASSWORD_FAILED:
      return {
        ...state,
        user: {
          password: "",
        },
        requestInProgress: false,
        requestError: true,
      };
    //сброс пароля   конец

    //получение данных о пользователе начало
    case GET_USER_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        auth: true,
        requestInProgress: false,
        requestError: false,
        user: {
          email: action.user.email,
          name: action.user.name,
        },
      };
    case GET_USER_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //получение данных о пользователе конец

    //обновление данных о пользователе начало
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        requestInProgress: true,
        requestError: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        requestInProgress: false,
        requestError: false,
        user: {
          email: action.user.email,
          name: action.user.name,
        },
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        requestInProgress: false,
        requestError: true,
      };
    //обновление данных о пользователе конец

    default:
      return state;
  }
};
