import React, { memo, useEffect } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order.module.css";
import { useSelector, useDispatch } from "../../utils/hooks";
import {
  getTrueDate,
  getPrice,
  getIngredientsArray,
  getCurrentOrder,
  getCookie,
  getStatus,
} from "../../utils/burger-api";
import Preloader from "../../components/preloader/preloader";
import { useParams } from "react-router-dom";
import {
  connect as OrderWsConnect,
  disconnect as OrderWsDisconnect,
} from "../../services/actions/ws-orders";
import { WSS } from "../../utils/burger-api";
import { TOrderItem } from "../../utils/types";
let WS_URL = WSS;

const Order = () => {
  const { items } = useSelector((store) => store.BurgerIngredients);
  const { data } = useSelector((store) => store.ws);
  const { requestInProgress } = useSelector((store) => store.AuthorizationData);
  const { id } = useParams<{ id: string }>();
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

  if (!data) {
    return <Preloader />;
  }

  const currentOrder = getCurrentOrder(id, data);
  const item: TOrderItem = currentOrder[0];

  const orderCompound = getIngredientsArray(item.ingredients, items);

  item.ingredients.forEach((id) => {
    items.forEach((obj: any) => {
      if (obj._id === id && obj.type === "bun") {
        obj.count = 2;
      } else if (obj._id === id && obj.type !== "bun") {
        let count = 0;

        item.ingredients.forEach((el) => {
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

  const price = getPrice(orderCompound);
  const time = item && item.createdAt && getTrueDate(item?.createdAt);

  if (requestInProgress) {
    return (
      <div className={`pt-30`}>
        <Preloader />
      </div>
    );
  }

  return (
    <div className={`${styles.container} mt-10 mb-10 mr-10 ml-10`}>
      <div className={`${styles.id} text text_type_digits-default `}>
        #{item.number}
      </div>
      <div className={` text text_type_main-medium mt-10 mb-3`}>
        {item.name}
      </div>
      <div className={`${styles.status} text text_type_main-default mb-15`}>
        <span
          className="text text_type_main-default"
          style={{ color: item.status === "done" ? "#00CCCC" : "#FFFFFF" }}
        >
          {item.status && getStatus(item.status)}
        </span>
      </div>

      <div className={`text text_type_main-medium mb-6`}>Состав:</div>
      <div className={`${styles.list} mr-6 custom-scroll`}>
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
