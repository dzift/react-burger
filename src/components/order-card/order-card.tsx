import React, { FC } from "react";
import styles from "./order-card.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TOrder } from "../../utils/types";
import { useSelector } from "../../utils/hooks";

const OrderCard: FC<TOrder> = ({
  number,
  name,
  ingredients,
  createdAt,
  status,
}) => {
  const { items } = useSelector((store) => store.BurgerIngredients);
  const imgArray: any = [];

  ingredients.forEach((id) => {
    items.forEach((obj: any) => {
      if (obj._id === id) {
        imgArray.push(obj.image_mobile);
      }
    });
  });

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
      {/* {status ? (
        <span className={`${styles.timestamp} text text_type_main-default`}>
          {status}
        </span>
      ) : null} */}
      <div className={`${styles.cardBottom}`}>
        <div className={`${styles.ingredientImg}`}>
          {imgArray.map((srt: string, index: number) => {
            if (index <= 4) {
              return (
                <div
                  className={`${styles.icon}`}
                  style={{ zIndex: imgArray.length - index }}
                  key={index}
                >
                  <img src={srt} alt="fff" />
                </div>
              );
            } else if (index === 5) {
              return (
                <div
                  style={{ zIndex: imgArray.length - index }}
                  className={`${styles.icon} ${styles.iconLast}`}
                  key={index}
                >
                  <img src={srt} className={`${styles.imgLast}`} alt="fff" />
                  <span className={`${styles.iconNumber}`}>{`+${
                    imgArray.length - 5
                  }`}</span>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
        <span className="text text_type_digits-medium mr-2">480</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
};

export default OrderCard;
