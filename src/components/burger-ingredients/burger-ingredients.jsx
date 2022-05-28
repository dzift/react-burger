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

const UrlApi = "https://norma.nomoreparties.space/api/ingredients";

const Ingredient = (props) => {
  const [isVisible, setVisible] = React.useState(false);

  function ON() {
    setVisible(true);
  }

  function OFF() {
    setVisible(false);
  }
  const modal = (
    <Modal onClose={OFF}>
      <IngredientDetails data={props} />
    </Modal>
  );

  return (
    <>
      <div>{isVisible && modal}</div>
      <div className={`${styles.item} pb-8`} key={props.id} onClick={ON}>
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
    </>
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

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  const bun = React.useRef(null);
  const sause = React.useRef(null);
  const main = React.useRef(null);

  const [error, setError] = React.useState(null);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(UrlApi)
      .then((res) => res.json())
      .then(
        (result) => {
          setItems(result);
        },
        (error) => {
          setError(error);
        }
      )
      .catch((e) => console.log(e));
  }, []);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (items.length === 0) {
    return (
      <div className="text text_type_main-large pt-10 pb-5">Загрузка...</div>
    );
  } else {
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
            {items.data.map((obj) => {
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
            {items.data.map((obj) => {
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
            {items.data.map((obj) => {
              if (obj.type === "main") {
                return <Ingredient key={obj._id} {...obj} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
