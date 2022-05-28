import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-details.module.css";
import Done from "../../images/done.gif";

const OrderDetails = (props) => {
  const { onClose, data } = props;
  return (
    <>
      <button className={styles.modalButtonOrder} onClick={onClose}>
        <CloseIcon type="primary" />
      </button>
      <div className={`${styles.modalOrder} mt-30 mb-8`}>
        <p className="text text_type_digits-large mb-15">034536</p>
        <p className="text text_type_main-medium">идентификатор заказа</p>
        <div className={`${styles.item} mt-15 mb-15`}>
          <img className={`${styles.orderImg}`} src={Done} alt="fff" />
        </div>

        <p className="text text_type_main-default mb-4">
          Ваш заказ начали готовить
        </p>
        <p className={`${styles.OrderText} text text_type_main-default mb-30`}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
