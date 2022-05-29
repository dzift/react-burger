import React from "react";
import PropTypes from "prop-types";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

const UrlForApi = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(UrlForApi)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      )
      .catch((e) => console.log(e));
  }, []);

  if (error) {
    return <div className={styles.preLoad}>Ошибка: {error.message}</div>;
  } else if (items.length === 0) {
    return (
      <div className={`${styles.preLoad} text text_type_main-large`}>
        Загрузка...
      </div>
    );
  } else {
    return (
      <div className="App">
        <AppHeader />
        <div className={styles.page}>
          <main>
            <div className={styles.content}>
              <BurgerIngredients {...items} />
              <BurgerConstructor {...items} />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
