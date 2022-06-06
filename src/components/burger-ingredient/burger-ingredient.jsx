import React from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ dataIngredient, count, dataInClick }) => {
  const { id, image, name, price } = dataIngredient;

  const openModal = () => {
    dataInClick(dataIngredient);
  };

  return (
    <>
      <div className={`${styles.itemCard} pb-8`} key={id} onClick={openModal}>
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
  );
};

// console.log(dataIngredient)

BurgerIngredient.propTypes = {
  dataIngredient: ingredientPropType.isRequired,
  count: PropTypes.number.isRequired,
  dataInClick: PropTypes.func.isRequired,
};

export default BurgerIngredient;
