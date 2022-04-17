import React from "react";
import "./app.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

function App() {
  return (
    <div className="App">
      <header className="appHeader">
        <div className="contentHeader">
          <div className="menu">
            <a href="/" className="itemHeader">
              <BurgerIcon type="primary" />
              Конструктор
            </a>
            <a href="/" className="itemHeader">
              <ListIcon type="secondary" />
              Лента заказов
            </a>
          </div>
          <a href="/" className="itemHeader">
            <Logo />
          </a>
          <a href="/" className="itemHeader">
            <ProfileIcon type="secondary" />
            Личный кабинет
          </a>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default App;
