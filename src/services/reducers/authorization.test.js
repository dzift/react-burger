import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
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
} from "../constants/authorization";

import { initialState } from "./authorization";

import { reducerAuthorization } from "./authorization";

describe("Redux store and actions", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({ result: "OK" }),
      ok: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return the initial state", () => {
    expect(reducerAuthorization(undefined, {})).toEqual(initialState);
  });

  it("should handle REGISTER_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: REGISTER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle REGISTER_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: REGISTER_SUCCESS,
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle REGISTER_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: REGISTER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle LOGIN_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGIN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle LOGIN_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGIN_SUCCESS,
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
        requestInProgress: false,
        requestError: false,
        isLoggedIn: true,
        auth: true,
      })
    );
  });

  it("should handle LOGIN_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGIN_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle TOKEN_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: TOKEN_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle TOKEN_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: TOKEN_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: true,
        isLoggedIn: true,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle TOKEN_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: TOKEN_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle LOGOUT_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGOUT_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle LOGOUT_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGOUT_SUCCESS,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle LOGOUT_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: LOGOUT_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: FORGOT_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: FORGOT_PASSWORD_SUCCESS,
        user: {
          email: undefined,
          name: "",
          password: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: undefined,
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle FORGOT_PASSWORD_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: FORGOT_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle RESET_PASSWORD_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: RESET_PASSWORD_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle RESET_PASSWORD_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: RESET_PASSWORD_SUCCESS,
        user: {
          password: "true",
          email: "",
          name: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          password: "true",
          email: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle RESET_PASSWORD_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: RESET_PASSWORD_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });
  it("should handle GET_USER_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: GET_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle GET_USER_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: GET_USER_SUCCESS,
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          password: "",
          email: "Danila",
          name: "danila@mail.com",
        },
        auth: true,
        isLoggedIn: true,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle GET_USER_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: GET_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });

  it("should handle UPDATE_USER_REQUEST", () => {
    expect(
      reducerAuthorization(initialState, {
        type: UPDATE_USER_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: true,
        requestError: false,
      })
    );
  });

  it("should handle UPDATE_USER_SUCCESS", () => {
    expect(
      reducerAuthorization(initialState, {
        type: UPDATE_USER_SUCCESS,
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "Danila",
          name: "danila@mail.com",
          password: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: false,
      })
    );
  });

  it("should handle UPDATE_USER_FAILED", () => {
    expect(
      reducerAuthorization(initialState, {
        type: UPDATE_USER_FAILED,
      })
    ).toEqual(
      expect.objectContaining({
        user: {
          email: "",
          password: "",
          name: "",
        },
        auth: false,
        isLoggedIn: false,
        requestInProgress: false,
        requestError: true,
      })
    );
  });
});
