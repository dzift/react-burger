import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import styles from "./order-details.module.css";
import Done from "../../images/done.gif";
import { postIngredients } from "../../utils/burger-api";

const OrderDetails = ({ onClose }) => {
  const [load, setLoad] = React.useState(true);
  const [orderNumber, setOrderNumber] = React.useState();

  React.useEffect(() => {
    postIngredients()
      .then((result) => {
        setOrderNumber(result.order.number);
        setLoad(false);
      })
      .catch(() =>
        alert("Произошла ошибка во время загрузки данных с сервера")
      );
  }, []);

  return (
    <>
      <button className={styles.modalButtonOrder} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
      <div className={`${styles.modalOrder} mt-30 mb-8`}>
        {load ? (
          <div className={`${styles.preLoad} text text_type_main-large`}>
            Загрузка...
          </div>
        ) : (
          <>
            <p className="text text_type_digits-large mb-15">{orderNumber}</p>
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
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
