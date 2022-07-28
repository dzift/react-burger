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
import { TUserData, TUser, AppThunk, AppDispatch } from "../../utils/types";

import {
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILED,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILED,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILED,
  TOKEN_SUCCESS,
  TOKEN_REQUEST,
  TOKEN_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILED,
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_FAILED,
} from "../constants/authorization";

// Типизация экшенов
export interface IRegisterSuccessActions {
  readonly type: typeof REGISTER_SUCCESS;
  readonly user: TUser;
}

export interface IRegisterRequestActions {
  readonly type: typeof REGISTER_REQUEST;
}

export interface IRegisterFailedActions {
  readonly type: typeof REGISTER_FAILED;
}

export interface IResetPasswordSuccessActions {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
}

export interface IResetPasswordRequestActions {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}

export interface IResetPasswordFailedActions {
  readonly type: typeof RESET_PASSWORD_FAILED;
}

export interface IForgotPasswordSuccessActions {
  email: string;
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}

export interface IForgotPasswordRequestActions {
  readonly type: typeof FORGOT_PASSWORD_REQUEST;
}

export interface IForgotPasswordFailedActions {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
}

export interface ILoginSuccessActions {
  readonly type: typeof LOGIN_SUCCESS;
  readonly user: TUser;
}

export interface ILoginRequestActions {
  readonly type: typeof LOGIN_REQUEST;
}

export interface ILoginFailedActions {
  readonly type: typeof LOGIN_FAILED;
}

export interface ITokenSuccessActions {
  readonly type: typeof TOKEN_SUCCESS;
}

export interface ITokenRequestActions {
  readonly type: typeof TOKEN_REQUEST;
}

export interface ITokenFailedActions {
  readonly type: typeof TOKEN_FAILED;
}

export interface ILogoutSuccessActions {
  readonly type: typeof LOGOUT_SUCCESS;
}

export interface ILogoutRequestActions {
  readonly type: typeof LOGOUT_REQUEST;
}

export interface ILogoutFailedActions {
  readonly type: typeof LOGOUT_FAILED;
}

export interface IGetUserSuccessActions {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

export interface IGetUserRequestActions {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedActions {
  readonly type: typeof GET_USER_FAILED;
}

export interface IUpdateUserSuccessActions {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

export interface IUpdateUserRequestActions {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailedActions {
  readonly type: typeof UPDATE_USER_FAILED;
}

export type TAuthorizationActions =
  | IRegisterSuccessActions
  | IRegisterRequestActions
  | IRegisterFailedActions
  | IResetPasswordSuccessActions
  | IResetPasswordRequestActions
  | IResetPasswordFailedActions
  | IForgotPasswordSuccessActions
  | IForgotPasswordRequestActions
  | IForgotPasswordFailedActions
  | ILoginSuccessActions
  | ILoginRequestActions
  | ILoginFailedActions
  | ITokenSuccessActions
  | ITokenRequestActions
  | ITokenFailedActions
  | ILogoutRequestActions
  | ILogoutSuccessActions
  | ILogoutFailedActions
  | IGetUserSuccessActions
  | IGetUserRequestActions
  | IGetUserFailedActions
  | IUpdateUserSuccessActions
  | IUpdateUserRequestActions
  | IUpdateUserFailedActions;

export const createNewUser: AppThunk = (
  password: string,
  email: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    createUser(password, email, name)
      .then((result: TUserData) => {
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

export const loginInApp: AppThunk = (password: string, email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    loginUser(password, email)
      .then((result: TUserData) => {
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

export const refreshUserToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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

export const logoutUserFromApp: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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

export const postForgotPass: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
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

export const resetForgotPass: AppThunk = (password: string, token: string) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });
    postResetPassword(password, token)
      .then(() => {
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

export const updateUserData: AppThunk = (
  password: string,
  email: string,
  name: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    updateUser(password, email, name)
      .then((result: any) => {
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

export const getUserData: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    getUser()
      .then((result: any) => {
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
