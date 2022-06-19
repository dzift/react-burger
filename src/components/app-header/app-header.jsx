import React from "react";
import styles from "./app-header.module.css";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.contentHeader}>
        <div className={styles.menu}>
          <a
            href="/"
            className={`${styles.active} pl-5 pr-5 mr-2 mt-4 mb-4 text  `}
          >
            <BurgerIcon type="primary" />
            <span className="ml-2">Конструктор</span>
          </a>
          <a
            href="/"
            className={`pl-5 pr-5 mt-4 mb-4 text text_color_inactive`}
          >
            <ListIcon type="secondary" />
            <span className="ml-2">Лента заказов</span>
          </a>
        </div>
        <a href="/" className={styles.logo}>
          <Logo />
        </a>
        <a href="/" className="mt-4 mb-4 pr-5 text text_color_inactive">
          <ProfileIcon type="secondary" />
          <span className="ml-2">Личный кабинет</span>
        </a>
      </div>
    </header>
  );
};

export default AppHeader;
