import React from "react";
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
  const [isVisible, setVisible] = React.useState(false);

  function ModalVisible() {
    setVisible(!isVisible);
  }

  const ModalWindow = (
    <Modal onClose={ModalVisible}>
      <IngredientDetails data={props} onClose={ModalVisible} />
    </Modal>
  );

  return (
    <>
      <div>{isVisible && ModalWindow}</div>
      <div
        className={`${styles.itemCard} pb-8`}
        key={props.id}
        onClick={ModalVisible}
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

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("one");
  const bun = React.useRef(null);
  const sause = React.useRef(null);
  const main = React.useRef(null);

  return (
    <div className="text text_type_main-large pt-10 pb-5 mr-10">
      Соберите бургер
      <div className={styles.tab}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={
            (setCurrent,
            function () {
              bun.current.scrollIntoView({
                behavior: "smooth",
              });
            })
          }
        >
          Булки
        </Tab>
        <Tab
          value="Соусы"
          active={current === "Соусы"}
          onClick={
            (setCurrent,
            function () {
              sause.current.scrollIntoView({
                behavior: "smooth",
              });
            })
          }
        >
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={
            (setCurrent,
            function () {
              main.current.scrollIntoView({
                behavior: "smooth",
              });
            })
          }
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.menuIngredients} custom-scroll ml-4`}>
        <div
          className={`${styles.groupIngridents} text text_type_main-medium pb-6 pt-10`}
          ref={bun}
        >
          Булки
        </div>
        <div className={styles.groupIngridents}>
          {props.data.map((obj) => {
            if (obj.type === "bun") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>

        <div
          className={`${styles.groupIngridents} text text_type_main-medium pb-6 pt-10`}
          ref={sause}
        >
          Соусы
        </div>
        <div className={styles.groupIngridents}>
          {props.data.map((obj) => {
            if (obj.type === "sauce") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>
        <div
          className={`${styles.groupIngridents} text text_type_main-medium pb-6 pt-10`}
          ref={main}
        >
          Начинки
        </div>
        <div className={styles.groupIngridents}>
          {props.data.map((obj) => {
            if (obj.type === "main") {
              return <Ingredient key={obj._id} {...obj} />;
            }
          })}
        </div>
      </div>
    </div>
  );
}

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
