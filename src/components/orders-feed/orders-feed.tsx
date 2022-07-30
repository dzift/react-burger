import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./orders-feed.module.css";
import OrderCard from "../order-card/order-card";

import { useSelector } from "../../utils/hooks";
import Preloader from "../preloader/preloader";

const OrdersFeed = () => {
  const location = useLocation();
  const { data } = useSelector((store) => store.ws);

  if (!data) {
    return <Preloader />;
  }

  return (
    <section className={`${styles.feed} custom-scroll`}>
      {data?.orders.map((orders) => {
        return (
          <Link
            key={orders._id}
            to={{
              pathname: `${location.pathname}/${orders.number}`,
              state: { background: location },
            }}
            className={styles.link}
          >
            <OrderCard
              number={orders.number}
              name={orders.name}
              ingredients={orders.ingredients}
              createdAt={orders.createdAt}
              status={orders.status}
            />
          </Link>
        );
      })}
    </section>
  );
};

export default OrdersFeed;
