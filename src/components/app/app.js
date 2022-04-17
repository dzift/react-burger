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
            <a href="/" className="itemHeader pl-5 pr-5 mr-2 mt-4 mb-4">
              <BurgerIcon type="primary" />
              <span className="ml-2">Конструктор</span>
            </a>
            <a href="/" className="itemHeader pl-5 pr-5 mt-4 mb-4">
              <ListIcon type="secondary" />
              <span className="ml-2">Лента заказов</span>
            </a>
          </div>
          <a href="/" className="itemHeader">
            <Logo />
          </a>
          <a href="/" className="itemHeader  mt-4 mb-4">
            <ProfileIcon type="secondary" />
            <span className="ml-2">Личный кабинет</span>
          </a>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default App;
