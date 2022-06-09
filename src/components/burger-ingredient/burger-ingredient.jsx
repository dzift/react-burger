import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag } from "react-dnd";

import { GET_CURRENT_ITEM } from "../../services/actions/burger-ingredient";
import { OPEN_MODAL } from "../../services/actions/modal";

const BurgerIngredient = ({ dataIngredient, count }) => {
  const dispatch = useDispatch();

  const [{ isDrag }, drag] = useDrag({
    type: "NEW_INGREDIENT",
    item: dataIngredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const { id, image, name, price } = dataIngredient;

  const openModal = () => {
    dispatch({
      type: GET_CURRENT_ITEM,
      currentItem: dataIngredient,
    });
    dispatch({
      type: OPEN_MODAL,
    });
  };

  return (
    !isDrag && (
      <>
        <div
          ref={drag}
          className={`${styles.itemCard} pb-8`}
          key={id}
          onClick={openModal}
        >
          <Counter count={count} size="default" />
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

// console.log(dataIngredient)

BurgerIngredient.propTypes = {
  dataIngredient: ingredientPropType.isRequired,
  count: PropTypes.number.isRequired,
};

export default React.memo(BurgerIngredient);
