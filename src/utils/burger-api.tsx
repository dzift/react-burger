import {
  TIngredientsData,
  TOrderData,
  TApiData,
  TUserData,
  TCookieProps,
} from "./types";
const URL_FOR_API = "https://norma.nomoreparties.space/api";

export const getIngredients = () => {
  return fetch(`${URL_FOR_API}/ingredients`, {
    method: "GET",
  }).then((res) => checkReponse<TIngredientsData>(res));
};

export const postIngredients = (orderItems: string[]) => {
  return fetch(`${URL_FOR_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: orderItems,
    }),
  }).then((res) => checkReponse<TOrderData>(res));
};

export const postForgotPassword = (email: string) => {
  return fetch(`${URL_FOR_API}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  }).then((res) => checkReponse<TApiData>(res));
};

export const postResetPassword = (password: string, token: string) => {
  return fetch(`${URL_FOR_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  }).then((res) => checkReponse<TApiData>(res));
};

export const createUser = (password: string, email: string, name: string) => {
  return fetch(`${URL_FOR_API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  }).then((res) => checkReponse<TUserData>(res));
};

export const loginUser = (password: string, email: string) => {
  return fetch(`${URL_FOR_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => checkReponse<TUserData>(res));
};

export const getUser = () => {
  return fetchWithRefresh(`${URL_FOR_API}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
  });
};

export const updateUser = (password: string, email: string, name: string) => {
  return fetchWithRefresh(`${URL_FOR_API}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const refreshToken = () => {
  return fetch(`${URL_FOR_API}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkReponse<TUserData>(res));
};

export const logoutUser = () => {
  return fetch(`${URL_FOR_API}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => checkReponse<TApiData>(res));
};

export const setCookie = (
  name: string,
  value: string | number | boolean,
  props?: TCookieProps
) => {
  props = {
    path: "/",
    ...props,
  };
  let exp = props.expires;
  const d = new Date();
  if (typeof exp == "number" && exp) {
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = Number(d);
  }

  if (exp && d.toUTCString) {
    props.expires = d.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;
  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        // eslint-disable-next-line
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  setCookie(name, "", {
    "max-age": -1,
  });
};

const checkReponse = <T,>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен

      if (!refreshData.success) {
        Promise.reject(refreshData);
      }

      localStorage.setItem("refreshToken", refreshData.refreshToken);

      setCookie("accessToken", refreshData.accessToken);

      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};
