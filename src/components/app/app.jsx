import React from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

const URL_FOR_API = "https://norma.nomoreparties.space/api/ingredients";
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const App = () => {
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState([true]);

  React.useEffect(() => {
    fetch(URL_FOR_API)
      .then(checkReponse)
      .then((result) => {
        setItems(result);
        setLoading(false);
      })
      .catch((err) => setError(error));
  }, []);

  if (error) {
    return <div className={styles.preLoad}>Ошибка: {error.message}</div>;
  } else if (loading) {
    return (
      <div className={`${styles.preLoad} text text_type_main-large`}>
        Загрузка...
      </div>
    );
  } else {
    return (
      <div>
        <AppHeader />
        <main className={styles.page}>
          <div className={styles.content}>
            <BurgerIngredients {...items} />
            <BurgerConstructor {...items} />
          </div>
        </main>
      </div>
    );
  }
};

export default App;
