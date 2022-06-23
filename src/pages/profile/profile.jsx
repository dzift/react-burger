import React, { memo, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { getUserData } from "../../services/actions/authorization";
import styles from "./profile.module.css";
import ProfileInfo from "../../components/profile-info/profile-info";
import Sidebar from "../../components/sidebar/sidebar";
import Preloader from "../../components/preloader/preloader";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { requestInProgress, requestError, user } = useSelector(
    (store) => store.AuthorizationData
  );

  // useEffect(() => {
  //   dispatch(console.log("1"));
  // }, [dispatch]);

  if (requestInProgress) {
    return <Preloader />;
  }

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
