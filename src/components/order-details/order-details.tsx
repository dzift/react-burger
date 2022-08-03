import React, { useEffect, useMemo } from "react";
import { postItems } from "../../services/actions/burger-constructor";
import styles from "./order-details.module.css";
import Done from "../../images/done.gif";
import { useSelector, useDispatch } from "../../utils/hooks";
import Preloader from "../preloader/preloader";

const OrderDetails = () => {
  const { orderInfo } = useSelector((store) => store.BurgerConstructor);

  const { bun, ingredients } = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );

  const orderItems = useMemo(() => [bun?._id], [bun?._id]);
  ingredients.map((obj) => orderItems.push(obj._id));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postItems(orderItems));
  }, [dispatch, orderItems]);

  if (!orderInfo) {
    return (
      <div className={`${styles.preloader}`}>
        <Preloader />
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.modalOrder} mt-30 `}>
        <>
          <p className="text text_type_digits-large mb-15">
            {orderInfo.order.number}
          </p>
          <p className="text text_type_main-medium">идентификатор заказа</p>
          <div className="mt-15 mb-15">
            <img className={`${styles.modalOrderImg}`} src={Done} alt="fff" />
          </div>
          <p className="text text_type_main-default mb-4">
            Ваш заказ начали готовить
          </p>
          <p
            className={`${styles.orderText} text text_type_main-default mb-30`}
          >
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      </div>
    </>
  );
};

export default OrderDetails;
