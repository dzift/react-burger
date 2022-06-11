import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import { GET_CURRENT_ITEM } from "../../services/actions/burger-ingredient";

const BurgerIngredient = ({ dataIngredient }) => {
  const dispatch = useDispatch();
  const dataFromApi = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );

  const [{ isDrag }, drag] = useDrag({
    type: "NEW_INGREDIENT",
    item: dataIngredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { image, name, price, type, _id } = dataIngredient;

  const count = () => {
    if (type === "bun") {
      return dataFromApi.bun ? (dataFromApi.bun._id === _id ? 2 : 0) : 0;
    } else {
      if (dataFromApi.ingredients.lenght !== 0) {
        let itemsArr = dataFromApi.ingredients.reduce((acc, item) => {
          const { _id } = item;
          if (!Object.hasOwn(acc, _id)) {
            acc[_id] = 1;
          } else {
            acc[_id] += 1;
          }
          return acc;
        }, {});
        if (itemsArr !== 0) {
          return itemsArr[_id];
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  };

  const openModal = () => {
    dispatch({
      type: GET_CURRENT_ITEM,
      currentItem: dataIngredient,
    });
  };

  return (
    !isDrag && (
      <>
        <div
          ref={drag}
          className={`${styles.itemCard} pb-8`}
          key={_id}
          onClick={openModal}
        >
          <Counter count={count()} size="default" />
          <img src={image} alt="fff" />
          <div className={styles.itemPrice}>
            <span className="text text_type_digits-default mr-2">{price}</span>
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.itemName} text text_type_main-small`}>
            {name}
          </div>
        </div>
      </>
    )
  );
};

BurgerIngredient.propTypes = {
  dataIngredient: ingredientPropType.isRequired,
};

export default React.memo(BurgerIngredient);
