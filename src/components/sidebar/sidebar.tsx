import { memo } from "react";
import { NavLink } from "react-router-dom";

import styles from "./sidebar.module.css";
import { logoutUserFromApp } from "../../services/actions/authorization";
import { useDispatch } from "../../utils/hooks";

const Sidebar = () => {
  const dispatch = useDispatch();

  const logoutClick = () => {
    dispatch(logoutUserFromApp());
  };
  return (
    <section className={`mr-15`}>
      <div className={`${styles.navList}  mb-20`}>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/profile"
            exact
            activeClassName={styles.linkActive}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            Профиль
          </NavLink>
        </div>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/profile/orders"
            exact
            activeClassName={styles.linkActive}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            История заказов
          </NavLink>
        </div>
        <div className={`${styles.navItem}`}>
          <NavLink
            to="/login"
            exact
            activeClassName={styles.linkActive}
            className={`${styles.link} text text_type_main-medium text_color_inactive`}
          >
            <span onClick={logoutClick}>Выход</span>
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
