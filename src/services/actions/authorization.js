import { createUser, loginUser } from "../../utils/burger-api";
import { setCookie } from "../../utils/burger-api";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_FAILED = "REGISTER_FAILED";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILED = "LOGIN_FAILED";

export const createNewUser = (password, email, name) => {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    createUser(password, email, name)
      .then((result) => {
        console.log("result:", result);
        let authToken = result.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
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
        console.log("result:", result);
        let authToken = result.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
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
