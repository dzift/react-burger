import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import { GET_ORDER_REQUEST } from "../../services/actions/burger-constructor";
import { OPEN_MODAL } from "../../services/actions/modal";

import { useSelector, useDispatch } from "react-redux";

import Modal from "../modal/modal.jsx";
import OrderDetails from "../order-details/order-details";

const Element = ({ name, price, image_mobile }) => (
  <li className={`${styles.constructorItem} pl-4`}>
    <DragIcon type="primary" />
    <div className="ml-2" />
    <ConstructorElement
      text={`${name}`}
      price={price}
      thumbnail={image_mobile}
    />
  </li>
);

const BurgerConstructor = ({ onDropHandler }) => {
  const dataFromApi = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );

  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      console.log("item", item);
      onDropHandler(item);
    },
  });

  const { posting } = useSelector((store) => store.BurgerConstructor);
  const { modalVisiable } = useSelector((store) => store.Modal);

  const dispatch = useDispatch();

  const setModal = () => {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    dispatch({
      type: OPEN_MODAL,
    });
  };

  return (
    <>
      {modalVisiable && posting && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
      <section className={`${styles.constructorCard} pt-25 pl-4 pb-10`}>
        <div className={styles.constructorMenu}>
          <div className={`${styles.constructorItemTop} pl-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={"Краторная булка N-200i (верх)`"}
              price={1255}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
              }
            />
          </div>
          <ul
            ref={dropRef}
            className={`${styles.constructorItemFlex} custom-scroll`}
          >
            {dataFromApi.ingredients.map((obj) => {
              console.log(obj);
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
          <div className={`${styles.constructorItemBottom} pl-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={"Краторная булка N-200i (верх)`"}
              price={1255}
              thumbnail={
                "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
              }
            />
          </div>
        </div>
        <div className={`${styles.constructorPrice} pt-10 pr-4`}>
          <span className="text text_type_digits-medium mr-2">{1255}</span>
          <CurrencyIcon type="primary" />
          <div className="mr-10" />
          <Button type="primary" size="large" onClick={setModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

Element.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image_mobile: PropTypes.string.isRequired,
};

export default BurgerConstructor;
