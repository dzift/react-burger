import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details";

const Element = (props) => {
  return (
    <li className={`${styles.constructorItem} pl-4`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={`${props.name}`}
        price={props.price}
        thumbnail={props.image_mobile}
      />
    </li>
  );
};

function BurgerConstructor(props) {
  const [isVisible, setVisible] = React.useState(false);

  function modalVisible() {
    setVisible(!isVisible);
  }

  const ModalWindow = (
    <Modal onClose={modalVisible}>
      <OrderDetails onClose={modalVisible} />
    </Modal>
  );

  return (
    <div>
      <div>{isVisible && ModalWindow}</div>
      <div className={`${styles.constructorCard} pt-25 pl-4 pb-10`}>
        <div className={styles.constructorMenu}>
          <div className="pl-8" id="constructorItemTop">
            <ConstructorElement
              type="top"
              isLocked={true}
              text="Краторная булка N-200i(верх)"
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            />
          </div>
          <ul className={`${styles.constructorItemFlex} custom-scroll`}>
            {props.data.map((obj) => {
              if (obj.type !== "bun") {
                return (
                  <Element
                    key={obj._id}
                    image_mobile={obj.image_mobile}
                    price={obj.price}
                    name={obj.name}
                  />
                );
              }
            })}
          </ul>

          <div className="pl-8" id="constructorItemBottom">
            {" "}
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i(низ)"
              price={200}
              thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
            />
          </div>
        </div>
        <div className={`${styles.constructorPrice} pt-10 pr-4`}>
          <span className={`${styles.constructorelementPrice} mr-10`}>
            <span className="text text_type_digits-medium mr-2">1000</span>{" "}
            <CurrencyIcon type="primary" />
          </span>
          <Button type="primary" size="large" onClick={modalVisible}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </div>
  );
}

Element.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_mobile: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default BurgerConstructor;
