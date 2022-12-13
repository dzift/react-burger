import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "../../utils/hooks";
import { useHistory } from "react-router-dom";
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
} from "../../services/constants/burger-constructor";

import Modal from "../modal/modal";

import OrderDetails from "../order-details/order-details";
import { TItemObject, TItemMobile } from "../../utils/types";

type TElementProps = {
  item: TItemObject;
  moveElement: (moveIndex: number, hoverIndex: number) => void;
  index: number;
  deleteItem: () => void;
};
const Element = ({ item, moveElement, index, deleteItem }: TElementProps) => {
  const { name, price, image_mobile }: TItemObject = item;
  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: "SORT_INGREDIENT",
    hover: (item: TItemObject, monitor) => {
      const moveIndex = item.index;
      const hoverIndex = index;
      if (moveIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        // @ts-ignore
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // @ts-ignore
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
        // @ts-ignore
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

const ElementBunTop = ({ name, price, image_mobile }: TItemMobile) => (
  <ConstructorElement
    type="top"
    isLocked={true}
    text={`${name} (верх)`}
    price={price}
    thumbnail={image_mobile}
  />
);

const ElementBunBottom = ({ name, price, image_mobile }: TItemMobile) => (
  <ConstructorElement
    type="bottom"
    isLocked={true}
    text={`${name} (низ)`}
    price={price}
    thumbnail={image_mobile}
  />
);

const BurgerConstructor = () => {
  const { auth } = useSelector((store) => store.AuthorizationData);

  const history = useHistory();

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
        (acc: any, item: { price: number }) => acc + item.price,
        0
      )
    );
  });

  const [, dropRef] = useDrop({
    accept: "NEW_INGREDIENT",
    drop(item: TItemObject) {
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
    if (auth) {
      if (dataFromApi.ingredients.length > 0 && dataFromApi.bun !== null) {
        dispatch({
          type: GET_ORDER_REQUEST,
        });
      } else {
        alert("Выберите булку и ингредиенты для своего заказа");
      }
    } else {
      history.replace("/login");
    }
  };

  const closeModal = () => {
    dispatch({
      type: CLEAR_CONSTRUCTOR,
    });
  };

  const moveElement = (moveIndex: number, hoverIndex: number) => {
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
        data-cy="drop-target"
        className={`pt-25 pl-4 pb-10`}
      >
        <div className={styles.constructorMenu}>
          <div className={`${styles.constructorItemTop} pl-8`} data-cy="up-bun">
            {dataFromApi.bun && (
              <ElementBunTop
                key={dataFromApi.bun._id}
                image_mobile={dataFromApi.bun.image_mobile}
                price={dataFromApi.bun.price}
                gf
                name={dataFromApi.bun.name}
              />
            )}
          </div>
          <ul
            className={`${styles.constructorItemFlex} custom-scroll`}
            data-cy="other-ingredients-container"
          >
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
              } else {
                return null;
              }
            })}
          </ul>
          <div
            className={`${styles.constructorItemBottom} pl-8`}
            data-cy="down-bun"
          >
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
          <span className="text text_type_digits-medium mr-2">
            {getTotaPrice}
          </span>
          <CurrencyIcon type="primary" />
          <div className="mr-10" />
          <Button type="primary" size="large" onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </section>
    </>
  );
};

export default BurgerConstructor;
