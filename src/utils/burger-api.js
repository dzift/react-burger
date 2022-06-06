const URL_FOR_API = "https://norma.nomoreparties.space/api";

export const getIngredients = () => {
  return fetch(`${URL_FOR_API}/ingredients`, {
    method: "GET",
  }).then((res) => checkReponse(res));
};

export const postIngredients = () => {
  return fetch(`${URL_FOR_API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ["60d3b41abdacab0026a733c6", "609646e4dc916e00276b2870"],
    }),
  }).then((res) => checkReponse(res));
};

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
