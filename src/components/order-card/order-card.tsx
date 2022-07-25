import React, { memo, FC } from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { useSelector } from "react-redux";

const OrderCard: FC<TOrder> = ({
  number,
  name,
  ingredients,
  createdAt,
  status,
}) => {
  const { items } = useSelector((store: any) => store.BurgerIngredients);

  return (
    <div className={`${styles.orderCard} p-6`}>
      <div className={`${styles.cardInfo} pb-6`}>
        <span className={`text text_type_digits-default`}>#{number}</span>
        <span className={`${styles.timestamp} text text_type_main-default`}>
          {createdAt}
        </span>
      </div>
      <div className={`${styles.name} text text_type_main-medium pb-6`}>
        {name}
      </div>
      {status ? (
        <span className={`${styles.timestamp} text text_type_main-default`}>
          {status}
        </span>
      ) : null}
      <div className={`${styles.cardBottom}`}>
        <div className={`${styles.ingredientImg}`}>
          {ingredients.map((id: string, index: number) => {
            return items.map((obj: any) => {
              if (obj._id === id) {
                console.log("done");
                return (
                  <div className={`${styles.icon}`} key={index}>
                    <img src={obj.image_mobile} alt="fff" />
                  </div>
                );
              } else {
                return null;
              }
            });
          })}
        </div>
        <span className="text text_type_digits-medium mr-2">480</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderCard;
