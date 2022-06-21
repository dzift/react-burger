import React, { memo } from "react";
import { NavLink } from "react-router-dom";

import styles from "./sidebar.module.css";

const Sidebar = () => {
  return (
    <section className={`mr-15`}>
      <div className={`${styles.navList}  mb-20`}>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/profile"
            exact
            activeClassName={styles.link_active}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Профиль
          </NavLink>
        </div>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/profile/orders"
            exact
            activeClassName={styles.link_active}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            История заказов
          </NavLink>
        </div>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/login"
            exact
            activeClassName={styles.link_active}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </NavLink>
        </div>
      </div>
      <span className={` text text_type_main-default text_color_inactive`}>
        В этом разделе вы можете изменить свои персональные данные
      </span>
    </section>
  );
};

export default memo(Sidebar);
