import React, { useEffect } from "react";
import styles from "./feed.module.css";
import OrdersFeed from "../../components/orders-feed/orders-feed";
import { useDispatch, useSelector } from "../../utils/hooks";
import {
  connect as OrderWsConnect,
  disconnect as OrderWsDisconnect,
} from "../../services/actions/ws-orders";
import { TOrderItem } from "../../utils/types";
// import { WS_URL } from "../../utils/burger-api";
import { getOrdersStatus, getCookie } from "../../utils/burger-api";

let WS_URL = "wss://norma.nomoreparties.space/orders/all";

const Feed = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.AuthorizationData);
  console.log(isLoggedIn);
  if (isLoggedIn) {
    const token = getCookie("accessToken");
    WS_URL = `wss://norma.nomoreparties.space/orders?token=${token}`;
  } else {
    WS_URL = "wss://norma.nomoreparties.space/orders/all";
  }

  useEffect(() => {
    dispatch(OrderWsConnect(WS_URL));
    return () => {
      dispatch(OrderWsDisconnect());
    };
  }, [dispatch]);

  const { data } = useSelector((store) => store.ws);

  const ordersStatus = getOrdersStatus(data?.orders);

  const ordersStatusDone = ordersStatus?.done.slice(0, 20);

  return (
    <div>
      <div className={`${styles.head} text text_type_main-large pt-10 pb-5`}>
        Лента заказов
      </div>
      <div className={`${styles.container}`}>
        <OrdersFeed />
        <div className={`${styles.info} ml-15`}>
          <div className={`${styles.block} mb-15`}>
            <div>
              <div className={` text text_type_main-medium mb-6 `}>Готовы:</div>
              <ul
                className={`${styles.list} ${styles.done} text text_type_digits-default custom-scroll`}
              >
                {ordersStatusDone?.map((i: TOrderItem) => (
                  <li key={i._id} className={`mb-2 mr-5`}>
                    {i.number}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={`text text_type_main-medium mb-6`}>В работе:</div>
              <ul
                className={`${styles.list} text text_type_digits-default custom-scroll`}
              >
                {ordersStatus?.pending.map((i: TOrderItem) => (
                  <li key={i._id} className={`mb-2 `}>
                    {i.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`text text_type_digits-large mb-15`}>
            <div className={`text text_type_main-medium`}>
              Выполнено за все время:
            </div>
            {data?.total || 0}
          </div>
          <div className={`text text_type_digits-large`}>
            <div className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </div>
            {data?.totalToday || 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
