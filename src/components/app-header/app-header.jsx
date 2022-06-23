import React from "react";
import styles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  const location = useLocation();
  return (
    <header className={styles.appHeader}>
      <div className={styles.contentHeader}>
        <div className={styles.menu}>
          <NavLink
            to="/"
            exact
            activeClassName={styles.linkActive}
            className={`${styles.link} pl-5 pr-5 mr-2 mt-4 mb-4 `}
          >
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"}
            />
            <span className="ml-2">Конструктор</span>
          </NavLink>
          <NavLink
            to="/feed"
            exact
            activeClassName={styles.linkActive}
            className={` ${styles.link} pl-5 pr-5 mt-4 mb-4 `}
          >
            <ListIcon
              type={location.pathname === "/orders" ? "primary" : "secondary"}
            />
            <span className="ml-2">Лента заказов</span>
          </NavLink>
        </div>
        <NavLink to="/" className={styles.logo}>
          <Logo />
        </NavLink>
        <NavLink
          to="/profile"
          activeClassName={styles.linkActive}
          className={`${styles.link} mt-4 mb-4 pr-5 `}
        >
          <ProfileIcon
            type={
              location.pathname === "/profile" ||
              location.pathname === "/profile/orders"
                ? "primary"
                : "secondary"
            }
          />
          <span className="ml-2">Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
};

export default AppHeader;
