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

const Element = (props) => (
  <li className={`${styles.constructorItem} pl-4`}>
    <DragIcon type="primary" />
    <div className="ml-2" />
    <ConstructorElement
      text={`${props.name}`}
      price={props.price}
      thumbnail={props.image_mobile}
    />
  </li>
);

const TopBun = (props) => {
  const found = props.data.find(function (element) {
    return element.type === "bun";
  });
  return (
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${found.name} (верх)`}
      price={found.price}
      thumbnail={found.image_mobile}
    />
  );
};
const BottomBun = (props) => {
  const found = props.data.find(function (element) {
    return element.type === "bun";
  });
  return (
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${found.name}(низ)`}
      price={found.price}
      thumbnail={found.image_mobile}
    />
  );
};

const BurgerConstructor = (props) => {
  const [showModal, switchModal] = React.useState(false);

  const modalVisible = () => {
    switchModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={modalVisible}>
          <OrderDetails onClose={modalVisible} />
        </Modal>
      )}
      <div className={`${styles.constructorCard} pt-25 pl-4 pb-10`}>
        <div className={styles.constructorMenu}>
          <div className="pl-8">
            <TopBun {...props} />
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
          <div className="pl-8">
            <BottomBun {...props} />
          </div>
        </div>
        <div className={`${styles.constructorPrice} pt-10 pr-4`}>
          <span className="text text_type_digits-medium mr-2">1000</span>
          <CurrencyIcon type="primary" />
          <div className="mr-10" />
          <Button type="primary" size="large" onClick={modalVisible}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

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

BottomBun.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_mobile: PropTypes.string.isRequired,
    })
  ).isRequired,
};

TopBun.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image_mobile: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BurgerConstructor;
