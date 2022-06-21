import React, { memo } from "react";
import { Switch, Route } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileInfo from "../../components/profile-info/profile-info";
import Sidebar from "../../components/sidebar/sidebar";

const Profile = () => {
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
