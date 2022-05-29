import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";

const Ingredient = (props) => {
  const [showModal, switchModal] = React.useState(false);

  const modalVisible = () => {
    switchModal(!showModal);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={modalVisible}>
          <IngredientDetails data={props} onClose={modalVisible} />
        </Modal>
      )}
      <div
        className={`${styles.itemCard} pb-8`}
        key={props.id}
        onClick={modalVisible}
      >
        <Counter count={1} size="default" />
        <img src={props.image} alt="fff" />
        <div className={styles.itemPrice}>
          <span className="text text_type_digits-default mr-2">
            {props.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.itemName} text text_type_main-small`}>
          {props.name}
        </div>
      </div>
    </>
  );
};

const BurgerIngredients = (props) => {
  const [typeItem, setTypeItem] = useState("one");
  const bun = useRef(null);
  const sauce = useRef(null);
  const main = useRef(null);

  return (
    <div className="text text_type_main-large pt-10 pb-5 mr-10">
      Соберите бургер
      <div className={styles.tab}>
        <div
          onClick={function () {
            bun.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <Tab
            value="Булки"
            active={typeItem === "Булки"}
            onClick={setTypeItem}
          >
            Булки
          </Tab>
        </div>
        <div
          onClick={function () {
            sauce.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <Tab
            value="Соусы"
            active={typeItem === "Соусы"}
            onClick={
              (setTypeItem,
              function () {
                sauce.current.scrollIntoView({
                  behavior: "smooth",
                });
              })
            }
          >
            Соусы
          </Tab>
        </div>
        <div
          onClick={function () {
            main.current.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <Tab
            value="Начинки"
            active={typeItem === "Начинки"}
            onClick={setTypeItem}
          >
            Начинки
          </Tab>
        </div>
      </div>
      <div className={`${styles.menuIngredients} custom-scroll ml-4`}>
        <div
          className={`${styles.groupIngredients} text text_type_main-medium pb-6 pt-10`}
          ref={bun}
        >
          Булки
        </div>
        <div className={styles.groupIngredients}>
          {props.data.map((obj) => {
            if (obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>

        <div
          className={`${styles.groupIngredients} text text_type_main-medium pb-6 pt-10`}
          ref={sauce}
        >
          Соусы
        </div>
        <div className={styles.groupIngredients}>
          {props.data.map((obj) => {
            if (obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>
        <div
          className={`${styles.groupIngredients} text text_type_main-medium pb-6 pt-10`}
          ref={main}
        >
          Начинки
        </div>
        <div className={styles.groupIngredients}>
          {props.data.map((obj) => {
            if (obj.type === "main") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  image_large: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      calories: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      image_large: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default BurgerIngredients;
