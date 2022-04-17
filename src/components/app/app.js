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
          <a href="/" className="itemHeader">
            <BurgerIcon type="primary" />
            <p className="text-icon">Конструктор</p>
          </a>
          <a href="/" className="itemHeader">
            <ListIcon type="secondary" />
            <p className="text-icon">Лента заказов</p>
          </a>
          <a href="/" className="itemHeader">
            <Logo />
          </a>
          <a href="/" className="itemHeader">
            <ProfileIcon type="secondary" />
            <p className="text-icon">Личный кабинет</p>
          </a>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default App;
