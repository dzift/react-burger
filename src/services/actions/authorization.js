import {
  createUser,
  loginUser,
  refreshToken,
  logoutUser,
  deleteCookie,
  setCookie,
  postResetPassword,
  postForgotPassword,
  updateUser,
  getUser,
} from "../../utils/burger-api";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const FORGOT_PASSWORD_SUCCESS = "FORGOT_PASSWORD_SUCCESS";
export const FORGOT_PASSWORD_REQUEST = "FORGOT_PASSWORD_REQUEST";
export const FORGOT_PASSWORD_FAILED = "FORGOT_PASSWORD_FAILED";

export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_FAILED = "RESET_PASSWORD_FAILED";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const TOKEN_SUCCESS = "TOKEN_SUCCESS";
export const TOKEN_REQUEST = "TOKEN_REQUEST";
export const TOKEN_FAILED = "TOKEN_FAILED";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";

export const createNewUser = (password, email, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    createUser(password, email, name)
      .then((result) => {
        const authToken = result.accessToken.split("Bearer ")[1];
        const refreshToken = result.refreshToken;
        if (authToken) {
          setCookie("token", authToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        dispatch({
          type: REGISTER_SUCCESS,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
        dispatch({
          type: REGISTER_FAILED,
        });
      });
  };
};

export const loginInApp = (password, email) => {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginUser(password, email)
      .then((result) => {
        const accessToken = result.accessToken.split("Bearer ")[1];
        const refreshToken = result.refreshToken;
        if (accessToken) {
          setCookie("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        dispatch({
          type: LOGIN_SUCCESS,
          user: result.user,
        });
      })
      .catch((err) => {
        alert(err.message);
        dispatch({
          type: LOGIN_FAILED,
        });
      });
  };
};

export const refreshUserToken = () => {
  return function (dispatch) {
    dispatch({
      type: TOKEN_REQUEST,
    });
    refreshToken()
      .then((result) => {
        const accessToken = result.accessToken.split("Bearer ")[1];
        const refreshToken = result.refreshToken;
        if (accessToken) {
          setCookie("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
        }
        dispatch({
          type: TOKEN_SUCCESS,
        });
      })
      .catch((err) => {
        alert(err.message);
        localStorage.removeItem("refreshToken");
        dispatch({
          type: TOKEN_FAILED,
        });
      });
  };
};

export const logoutUserFromApp = () => {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    logoutUser()
      .then(() => {
        localStorage.removeItem("refreshToken");
        deleteCookie("accessToken");
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      })
      .catch((err) => {
        alert(err.message);
        dispatch({
          type: LOGOUT_FAILED,
        });
      });
  };
};

export const postForgotPass = (email) => {
  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });
    postForgotPassword(email)
      .then((result) => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
          email: result.success,
        });
      })
      .catch((err) => {
        alert(err.message);
        dispatch({
          type: FORGOT_PASSWORD_FAILED,
        });
      });
  };
};

export const resetForgotPass = (password, token) => {
  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    postResetPassword(password, token)
      .then((result) => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });
      })
      .catch((err) => {
        alert(err.message);
        dispatch({
          type: RESET_PASSWORD_FAILED,
        });
      });
  };
};

export const updateUserData = (password, email, name) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUser(password, email, name)
      .then((result) => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          user: result.user,
        });
      })
      .catch((err) => {
        alert("err.message");
        dispatch({
          type: UPDATE_USER_FAILED,
        });
      });
  };
};

export const getUserData = () => {
  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((result) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: result.user,
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
};
