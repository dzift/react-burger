import React, { memo } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileInfo from "../../components/profile-info/profile-info";
import Sidebar from "../../components/sidebar/sidebar";
import Preloader from "../../components/preloader/preloader";

const Profile = () => {
  const isAuthChecked = true;
  const location = useLocation();

  if (!isAuthChecked)
    return (
      <div className={`mt-30`}>
        <Preloader />
      </div>
    );

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.content} mt-30`}>
        <Sidebar />
        <Switch>
          <Route path="/profile" exact={true}>
            <ProfileInfo />
          </Route>
          <Route path="/profile/orders" exact={true}>
            <div>
              <h2>ORDERS</h2>
            </div>
          </Route>

          <Route>
            <div className={`${styles.error}`}>
              <h2>404 ERROR</h2>
            </div>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default memo(Profile);
