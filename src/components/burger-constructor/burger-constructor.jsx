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

const ElementBunTop = ({ name, price, image_mobile }) => (
  <ConstructorElement
    type="top"
    isLocked={true}
    text={`${name} (верх)`}
    price={price}
    thumbnail={image_mobile}
  />
);

const ElementBunBottom = ({ name, price, image_mobile }) => (
  <ConstructorElement
    type="bottom"
    isLocked={true}
    text={`${name} (низ)`}
    price={price}
    thumbnail={image_mobile}
  />
);

const BurgerConstructor = ({ onDropHandler }) => {
  const dataFromApi = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );
  console.log(dataFromApi);
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
      <section
        ref={dropRef}
        className={`${styles.constructorCard} pt-25 pl-4 pb-10`}
      >
        <div className={styles.constructorMenu}>
          <div className={`${styles.constructorItemTop} pl-8`}>
            {dataFromApi.bun && (
              <ElementBunTop
                key={dataFromApi.bun._id}
                image_mobile={dataFromApi.bun.image_mobile}
                price={dataFromApi.bun.price}
                name={dataFromApi.bun.name}
              />
            )}
          </div>
          <ul className={`${styles.constructorItemFlex} custom-scroll`}>
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
            {dataFromApi.bun && (
              <ElementBunBottom
                key={dataFromApi.bun._id}
                image_mobile={dataFromApi.bun.image_mobile}
                price={dataFromApi.bun.price}
                name={dataFromApi.bun.name}
              />
            )}
          </div>
        </div>
        <div className={`${styles.constructorPrice} pt-10 pr-4`}>
          <span className="text text_type_digits-medium mr-2">{0}</span>
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
