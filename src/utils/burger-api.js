const URL_FOR_API = "https://norma.nomoreparties.space/api";

export const getIngredients = () => {
  return fetch(`${URL_FOR_API}/ingredients`, {
    method: "GET",
  }).then((res) => checkReponse(res));
};

export const postIngredients = (orderItems) => {
  return fetch(`${URL_FOR_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: orderItems,
    }),
  }).then((res) => checkReponse(res));
};

export const postForgotMail = (email) => {
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

export const postResetPassword = (password) => {
  return fetch(`${URL_FOR_API}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      token: "",
    }),
  }).then((res) => checkReponse(res));
};

export const createUser = (password, email, name) => {
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

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
