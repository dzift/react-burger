import React, { useEffect, memo } from "react";
import styles from "./order.module.css";
import { dataFeed } from "../../utils/data";
import { useSelector } from "react-redux";
import { getTrueDate } from "../../utils/burger-api";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { orderCompound } from "../../utils/data";
import Preloader from "../../components/preloader/preloader";

const Order = () => {
  const { items } = useSelector((store: any) => store.BurgerIngredients);
  const { requestInProgress } = useSelector(
    (store: any) => store.AuthorizationData
  );

  const item = dataFeed.orders[0];

  const getOrderCompound = (item: any, items: any) => {
    const arr: any[] = [];
    item.ingredients.map((id: string) => {
      items.map((obj: any) => {
        if (obj._id === id && obj.type !== "bun") {
          let count = 0;

          item.ingredients.forEach((el: string) => {
            if (id === el) {
              count += 1;
            }
          });

          if (obj.count === undefined) {
            obj.count = count;
            arr.push(obj);
          }
        } else if (obj._id === id && obj.type === "bun") {
          obj.count = 2;
          arr.push(obj);
        }
      });
    });
    console.info(arr, "arr");
    return arr;
  };

  useEffect(() => {
    getOrderCompound(item, items);
  }, []);

  const getPrice = (arr: any) => {
    return arr.reduce((acc: any, { price, count }: any) => {
      return (acc += price * count);
    }, 0);
  };

  let price = getPrice(orderCompound);
  const time = item && item.createdAt && getTrueDate(item?.createdAt);

  if (requestInProgress) {
    return (
      <div className={`pt-30`}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.id} text text_type_digits-default `}>
        #{dataFeed.orders[0]._id}
      </div>

      <div className={` text text_type_main-medium mt-10 mb-3`}>
        {dataFeed.orders[0].name}
      </div>
      <div className={`${styles.status} text text_type_main-default mb-15`}>
        {dataFeed.orders[0].status}
      </div>

      <div className={`text text_type_main-medium mb-6`}>Состав:</div>
      <div className={`${styles.list} mr-6`}>
        {orderCompound &&
          orderCompound.map((obj: any, index: number) => {
            return (
              <div key={index} className={`${styles.listItem} mb-4`}>
                <div className={`${styles.icon} mr-4`}>
                  <img src={obj.image_mobile} alt="fff" />
                </div>
                <div className={`${styles.info} text text_type_main-default`}>
                  {obj.name}
                  <div className={`${styles.price} ml-4 `}>
                    <span className={`text text_type_digits-default mr-2`}>
                      {obj.count} x {obj.price}
                    </span>
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={`${styles.info} text text_type_main-default mt-10`}>
        {time}
        <div className={`${styles.price} ml-4 `}>
          <span className={`text text_type_digits-default mr-2`}>
            {price || 0}
          </span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default memo(Order);
