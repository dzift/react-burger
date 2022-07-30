import React, { memo, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import styles from "./profile.module.css";
import ProfileInfo from "../../components/profile-info/profile-info";
import Sidebar from "../../components/sidebar/sidebar";
import Preloader from "../../components/preloader/preloader";
import { useSelector, useDispatch } from "../../utils/hooks";
import OrdersFeed from "../../components/orders-feed/orders-feed";

import {
  connect as OrderWsConnect,
  disconnect as OrderWsDisconnect,
} from "../../services/actions/ws-orders";
import { getCookie } from "../../utils/burger-api";
import { WSS } from "../../utils/burger-api";

let WS_URL = WSS;

const Profile = () => {
  const { requestInProgress } = useSelector((store) => store.AuthorizationData);
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((store) => store.AuthorizationData);

  if (isLoggedIn) {
    const token = getCookie("accessToken");
    WS_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;
  } else {
    WS_URL = WSS;
  }

  useEffect(() => {
    dispatch(OrderWsConnect(WS_URL));
    return () => {
      dispatch(OrderWsDisconnect());
    };
  }, [dispatch]);

  if (requestInProgress) {
    return (
      <div className={`pt-30`}>
        <Preloader />
      </div>
    );
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
            <OrdersFeed />
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
