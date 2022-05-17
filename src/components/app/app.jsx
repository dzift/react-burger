import React from "react";
import styles from "./app.module.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";

console.log(styles);

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className={styles.page}>
        <main>
          <div className={styles.content}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
