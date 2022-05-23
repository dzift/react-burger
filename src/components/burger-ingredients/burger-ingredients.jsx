import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data.js";
import Modal from "../modal-ingridient/modal-ingridient";

const Ingredient = (props) => {
  const [isVisible, setVisible] = React.useState({
    visible: false,
  });

  function ON() {
    console.log("TEST");
    setVisible({ visible: true });
  }

  function OFF() {
    console.log(setVisible);
    setVisible({ visible: false });
  }
  const modal = (
    <Modal header="Внимание!" onClick={OFF}>
      <p>Спасибо за внимание!</p>
      <p>Открывай меня, если станет скучно :)</p>
    </Modal>
  );

  return (
    <div className={`${styles.item} pb-8`} key={props.id} onClick={ON}>
      {isVisible && modal}
      <Counter count={1} size="default" />
      <img className="pl-4 pb-1" src={props.image} alt="fff" />
      <div className={styles.itemPrice}>
        <span className={`${styles.elementPrice} mr-2`}>{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.itemName} text text_type_main-small`}>
        {props.name}
      </div>
    </div>
  );
};

Ingredient.propTypes = {
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
};

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  const bun = React.useRef(null);
  const sause = React.useRef(null);
  const main = React.useRef(null);

  return (
    <div className={`${styles.burgerIngredients} mr-10`}>
      <div className="text text_type_main-large pt-10 pb-5">
        Соберите бургер
      </div>
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
      <div className={`${styles.menuIngredients} ml-4`}>
        <div
          className={`${styles.groupIngridents} text text_type_main-medium pb-6 pt-10`}
          ref={bun}
        >
          Булки
        </div>
        <div className={styles.groupIngridents}>
          {data.map((obj) => {
            if (obj.type === "bun") {
              return (
                <Ingredient
                  key={obj._id}
                  image={obj.image}
                  price={obj.price}
                  name={obj.name}
                />
              );
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
          {data.map((obj) => {
            if (obj.type === "sauce") {
              return (
                <Ingredient
                  key={obj._id}
                  image={obj.image}
                  price={obj.price}
                  name={obj.name}
                />
              );
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
          {data.map((obj) => {
            if (obj.type === "main") {
              return (
                <Ingredient
                  key={obj._id}
                  image={obj.image}
                  price={obj.price}
                  name={obj.name}
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default BurgerIngredients;
