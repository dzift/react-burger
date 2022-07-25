import React from "react";
import styles from "./feed.module.css";
import OrdersFeed from "../../components/orders-feed/orders-feed";

const Feed = () => {
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
              <div className={` text text_type_main-medium mb-6`}>Готовы:</div>
              <ul
                className={`${styles.list} ${styles.done} text text_type_digits-default custom-scroll`}
              >
                <li>034533</li>
                <li>034533</li>
                <li>034533</li>
                <li>034533</li>
                <li>034533</li>
              </ul>
            </div>
            <div>
              <div className={`text text_type_main-medium mb-6`}>В работе:</div>
              <ul
                className={`${styles.list} text text_type_digits-default custom-scroll`}
              >
                <li>034538</li>
                <li>034538</li>
                <li>034538</li>
              </ul>
            </div>
          </div>

          <div className={`text text_type_digits-large mb-15`}>
            <div className={`text text_type_main-medium`}>
              Выполнено за все время:
            </div>
            28752
          </div>
          <div className={`text text_type_digits-large`}>
            <div className={`text text_type_main-medium`}>
              Выполнено за сегодня:
            </div>
            138
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
