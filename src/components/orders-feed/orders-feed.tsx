import React, { useEffect, useMemo } from "react";
import styles from "./orders-feed.module.css";
import OrderCard from "../order-card/order-card";

const OrdersFeed = () => {
  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.feed}`}>
        <h2 className="text">Лента заказов</h2>
        <div className="list"></div>
      </div>
      <div className="info"></div>
    </div>
  );
};

export default OrdersFeed;
