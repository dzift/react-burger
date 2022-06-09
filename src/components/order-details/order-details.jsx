import React, { useEffect } from "react";
import { postIngredients } from "../../utils/burger-api";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import Done from "../../images/done.gif";
import { useSelector, useDispatch } from "react-redux";

import {
  GET_ORDER_FAILED,
  GET_ORDER_SUCCESS,
} from "../../services/actions/burger-constructor";

const OrderDetails = () => {
  const { error } = useSelector((store) => store.BurgerIngredients);
  const { orderInfo } = useSelector((store) => store.BurgerConstructor);
  const id = useSelector((store) => store.BurgerConstructor.itemConstructor);

  const orderItems = [id.bun._id];
  id.ingredients.map((obj) => {
    orderItems.push(obj._id);
  });

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(orderItems);
    postIngredients(orderItems)
      .then((result) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orderInfo: result,
        });
      })
      .catch(() => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  }, []);

  return (
    <>
      <div className={`${styles.modalOrder} mt-30 mb-8`}>
        {error && alert("Произошла ошибка во время загрузки данных с сервера!")}
        {!orderInfo ? (
          <div className={`${styles.preLoad} text text_type_main-large`}>
            Загрузка...
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

OrderDetails.propTypes = {
  // onClose: PropTypes.func.isRequired,
};

export default React.memo(OrderDetails);
