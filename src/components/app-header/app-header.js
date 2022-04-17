import React from "react";
import "./app-header.css";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

class AppHeader extends React.Component {
  render() {
    return (
      <header className="appHeader">
        <div className="contentHeader">
          <div className="menu">
            <a
              href="/"
              className="itemHeader pl-5 pr-5 mr-2 mt-4 mb-4 text active"
            >
              <BurgerIcon type="primary" />
              <span className="ml-2">Конструктор</span>
            </a>
            <a
              href="/"
              className="itemHeader pl-5 pr-5 mt-4 mb-4 text text_color_inactive"
            >
              <ListIcon type="secondary" />
              <span className="ml-2">Лента заказов</span>
            </a>
          </div>
          <a href="/" className="itemHeader logo">
            <Logo />
          </a>
          <a
            href="/"
            className="itemHeader mt-4 mb-4 pr-5 text text_color_inactive"
          >
            <ProfileIcon type="secondary" />
            <span className="ml-2">Личный кабинет</span>
          </a>
        </div>
      </header>
    );
  }
}

export default AppHeader;
