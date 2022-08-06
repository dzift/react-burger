import React, { FC } from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import { TOrderItem } from "../../utils/types";
import { useLocation } from "react-router-dom";
import {
  getTrueDate,
  getPrice,
  getIngredientsArray,
  getStatus,
} from "../../utils/burger-api";
import { items, location } from "../../utils/data";

const OrderCard: FC<TOrderItem> = ({
  number,
  name,
  ingredients,
  createdAt,
  status,
}) => {
  // const { items } = useSelector((store) => store.BurgerIngredients);
  // const location = useLocation();
  const orderCompound = getIngredientsArray(ingredients, items);

  ingredients?.forEach((id) => {
    items.forEach((obj: any) => {
      if (obj._id === id && obj.type === "bun") {
        obj.count = 2;
      } else if (obj._id === id && obj.type !== "bun") {
        let count = 0;

        ingredients.forEach((el) => {
          if (id === el) {
            count += 1;
          }
        });
        if (obj.count === undefined) {
          obj.count = count;
        }
      }
    });
  });

  const time = createdAt && createdAt && getTrueDate(createdAt);
  const price: number = getPrice(orderCompound);

  return (
    <div className={`${styles.orderCard} p-6`}>
      <div className={`${styles.cardInfo} pb-6`}>
        <span className={`text text_type_digits-default`}>#{number}</span>
        <span className={`${styles.timestamp} text text_type_main-default`}>
          {time}
        </span>
      </div>
      <div
        className={`${styles.name} text text_type_main-medium mb-6 custom-scroll`}
      >
        {name}
      </div>
      {status ? (
        <span
          className="text text_type_main-default"
          style={{ color: status === "done" ? "#00CCCC" : "#FFFFFF" }}
        >
          {location.pathname === "/profile/orders" && getStatus(status)}
        </span>
      ) : null}
      <div className={`${styles.cardBottom}`}>
        <div className={`${styles.ingredientImg}`}>
          {orderCompound?.map((obj, index) => {
            if (index <= 4) {
              return (
                <div
                  className={`${styles.icon}`}
                  style={{ zIndex: orderCompound.length - index }}
                  key={index}
                >
                  <img src={obj.image_mobile} alt="fff" />
                </div>
              );
            } else if (index === 5) {
              return (
                <div
                  style={{ zIndex: orderCompound.length - index }}
                  className={`${styles.icon} ${styles.iconLast}`}
                  key={index}
                >
                  <img
                    src={obj.image_mobile}
                    className={`${styles.imgLast}`}
                    alt="fff"
                  />
                  <span className={`${styles.iconNumber}`}>{`+${
                    orderCompound.length - 5
                  }`}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <span className="text text_type_digits-medium mr-2">
          {price}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
