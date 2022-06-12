import React, { useEffect, useRef } from "react";
import { ingredientPropType } from "../../utils/prop-types";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useDrag, useDrop } from "react-dnd";
import styles from "./burger-constructor.module.css";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
  GET_ORDER_REQUEST,
  DEL_ITEM_IN_CONSTRUCTOR,
  ADD_ITEM_IN_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  SORT_ITEM_IN_CONSTRUCTOR,
} from "../../services/actions/burger-constructor";

import Modal from "../modal/modal.jsx";

import OrderDetails from "../order-details/order-details";

const Element = ({ item, moveElement, index, deleteItem }) => {
  const { name, price, image_mobile } = item;
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "SORT_INGREDIENT",
    hover: (item, monitor) => {
      const moveIndex = item.index;
      const hoverIndex = index;
      if (moveIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (moveIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (moveIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveElement(moveIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDrag }, drag] = useDrag({
    type: "SORT_INGREDIENT",
    item: () => {
      return { index };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const opacity = isDrag ? 0 : 1;
  drag(drop(ref));

  return (
    <>
      <li
        ref={ref}
        className={`${styles.constructorItem} pl-4`}
        style={{ opacity }}
      >
        <DragIcon type="primary" />
        <div className="ml-2" />
        <ConstructorElement
          text={`${name}`}
          price={price}
          thumbnail={image_mobile}
          handleClose={deleteItem}
        />
      </li>
    </>
  );
};

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

const PriceElement = ({ getTotaPrice }) => {
  return (
    <>
      <span className="text text_type_digits-medium mr-2">{getTotaPrice}</span>
      <CurrencyIcon type="primary" />
      <div className="mr-10" />
    </>
  );
};

const BurgerConstructor = () => {
  const dataFromApi = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );

  const getTotaPrice = useSelector((store) => {
    const bun = store.BurgerConstructor.itemConstructor.bun
      ? store.BurgerConstructor.itemConstructor.bun.price
      : 0;
    return (
      bun * 2 +
      store.BurgerConstructor.itemConstructor.ingredients.reduce(
        (acc, item) => acc + item.price,
        0
      )
    );
  });

  const [{ isOver }, dropRef] = useDrop({
    accept: "NEW_INGREDIENT",
    drop(item) {
      dispatch({
        type: ADD_ITEM_IN_CONSTRUCTOR,
        item: { ...item, itemKey: uuidv4() },
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const { postingOrder } = useSelector((store) => store.BurgerConstructor);

  const dispatch = useDispatch();

  const openModal = () => {
    if (dataFromApi.ingredients.length > 0 && dataFromApi.bun !== null) {
      dispatch({
        type: GET_ORDER_REQUEST,
      });
    } else {
      alert("Выберите булку и ингредиента своего заказа");
    }
  };

  const closeModal = () => {
    dispatch({
      type: CLEAR_CONSTRUCTOR,
    });
  };

  const dragingInProgress = isOver
    ? styles.constructorCard
    : styles.constructorCardHover;

  const moveElement = (moveIndex, hoverIndex) => {
    dispatch({
      type: SORT_ITEM_IN_CONSTRUCTOR,
      moveIndex: moveIndex,
      hoverIndex: hoverIndex,
    });
  };

  return (
    <>
      {postingOrder && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
      <section
        ref={dropRef}
        className={`${dragingInProgress} pt-25 pl-4 pb-10`}
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
            {dataFromApi.ingredients.map((obj, index) => {
              const deleteItem = () => {
                dispatch({
                  type: DEL_ITEM_IN_CONSTRUCTOR,
                  itemKey: obj.itemKey,
                });
              };
              if (obj.type !== "bun") {
                return (
                  <Element
                    index={index}
                    key={obj.itemKey}
                    item={obj}
                    moveElement={moveElement}
                    deleteItem={deleteItem}
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
          <PriceElement getTotaPrice={getTotaPrice} />
          <Button type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

Element.propTypes = {
  item: ingredientPropType,
  deleteItem: PropTypes.func.isRequired,
  moveElement: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
ElementBunTop.propTypes = ingredientPropType.isRequired;
ElementBunBottom.propTypes = ingredientPropType.isRequired;
PriceElement.propTypes = {
  getTotaPrice: PropTypes.number.isRequired,
};
export default BurgerConstructor;
