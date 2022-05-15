import React from "react";
import "./app.css";

import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main>
        <div className="content">
          <BurgerIngredients />
          <div
            style={{
              background: "#934838",
            }}
          >
            2
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
