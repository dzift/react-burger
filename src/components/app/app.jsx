import React from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { getIngredients } from "../../utils/burger-api";

const App = () => {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getIngredients()
      .then((result) => {
        setItems(result.data);
        setLoading(false);
      })
      .catch(() =>
        alert("Произошла ошибка во время загрузки данных с сервера")
      );
  }, []);

  return (
    <div>
      <AppHeader />
      {loading ? (
        <div className={`${styles.preLoad} text text_type_main-large`}>
          Загрузка...
        </div>
      ) : (
        <main className={styles.page}>
          <div className={styles.content}>
            <BurgerIngredients dataFromApi={items} />
            <BurgerConstructor dataFromApi={items} />
          </div>
        </main>
      )}
    </div>
  );
};

export default App;
