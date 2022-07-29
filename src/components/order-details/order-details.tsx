import React, { useEffect, useMemo } from "react";
import { postItems } from "../../services/actions/burger-constructor";
import styles from "./order-details.module.css";
import Done from "../../images/done.gif";
import { useSelector, useDispatch } from "../../utils/hooks";
import Preloader from "../preloader/preloader";
import { TItemObject } from "../../utils/types";

const OrderDetails = () => {
  const { orderInfo } = useSelector((store) => store.BurgerConstructor);

  const id = useSelector((store: any) => store.BurgerConstructor);

  const orderItems = useMemo(() => [id.bun._id], [id.bun._id]);
  id.ingredients.map((obj: TItemObject) => orderItems.push(obj._id));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postItems(orderItems));
  }, [dispatch, orderItems]);

  if (!orderInfo) {
    return (
      <div className={`pt-30`}>
        <Preloader />
      </div>
    );
  }

  return (
    <>
      <div className={`${styles.modalOrder} mt-30 mb-8`}>
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
