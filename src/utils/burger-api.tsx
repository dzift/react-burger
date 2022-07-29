import { TCookieProps, TItemObject, TOrder } from "./types";
const URL_FOR_API = "https://norma.nomoreparties.space/api";
export const WSS = "wss://norma.nomoreparties.space/orders/all";

export const getIngredients = () => {
  return fetch(`${URL_FOR_API}/ingredients`, {
    method: "GET",
  }).then((res) => checkReponse(res));
};

export const postIngredients = (orderItems: string[]) => {
  return fetch(`${URL_FOR_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("accessToken"),
    },
    body: JSON.stringify({
      ingredients: orderItems,
    }),
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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
  }).then((res) => checkReponse(res));
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

const checkReponse = (res: Response) => {
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

export const getTrueDate = (date: string) => {
  const dayCreated: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime: number = Math.ceil(
    (today.getTime() - dayCreated.getTime()) / (60 * 60 * 24 * 1000)
  );
  const hours =
    dayCreated.getHours() > 9
      ? dayCreated.getHours()
      : `0${dayCreated.getHours()}`;
  const min =
    dayCreated.getMinutes() > 9
      ? dayCreated.getMinutes()
      : `0${dayCreated.getMinutes()}`;

  return `${getDays(diffTime)}, ${hours}:${min} i-GMT+${
    (dayCreated.getTimezoneOffset() * -1) / 60
  }`;
};
const getDays = (days: number) =>
  days === 0
    ? "Сегодня"
    : days === 1
    ? "Вчера"
    : days > 1
    ? `${days} дня(-ей) назад`
    : "Что-то пошло не так:(";

export const getPrice = (arr: any) => {
  return arr.reduce((acc: any, { price, count }: any) => {
    return (acc += price * count);
  }, 0);
};

export const getIngredientsArray = (
  ingredients: Array<string>,
  items: TItemObject[]
) => {
  return ingredients
    ?.map((id: string) => items.filter((item) => item._id === id))
    ?.flat();
};

export const getOrdersStatus = (arr: any) => {
  return arr?.reduce(
    (acc: any, curr: any) => {
      if (curr.status === "done") {
        acc["done"] = [...acc["done"], curr];
      } else {
        acc["pending"] = [...acc["pending"], curr];
      }
      return acc;
    },
    { done: [], pending: [] }
  );
};

export const getCurrentOrder = (id: string, data: TOrder) => {
  return data.orders.filter((item: any) => String(item.number) === id);
};

export const getStatus = (status: string) => {
  if (status === "done") return "Выполнен";
  if (status === "created") return "Создан";
  if (status === "pending") return "Готовится";
  return false;
};
