import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./orders-feed.module.css";
import OrderCard from "../order-card/order-card";
import { dataFeed } from "../../utils/data";
import { TOrder } from "../../utils/types";

const OrdersFeed = () => {
  const location = useLocation();
  const items: any = dataFeed;
  return (
    <section className={`${styles.feed}`}>
      <div className="list">
        {items.orders?.map((obj: TOrder) => {
          return (
            <Link
              key={obj._id}
              to={{
                pathname: `/feed/${obj.number}`,
                state: { background: location },
              }}
              className={styles.link}
            >
              <OrderCard {...obj} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default OrdersFeed;
