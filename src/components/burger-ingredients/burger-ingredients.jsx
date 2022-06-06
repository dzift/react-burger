import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";

const BurgerIngredients = ({ dataFromApi }) => {
  const [typeItem, setTypeItem] = useState("one");
  const [dataInModal, switchModal] = React.useState();

  const modalVisible = () => {
    switchModal(null);
  };

  const bun = useRef(null);
  const sauce = useRef(null);
  const main = useRef(null);

  return (
    <>
      {dataInModal && (
        <Modal onClose={modalVisible}>
          <IngredientDetails data={dataInModal} onClose={modalVisible} />
        </Modal>
      )}

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
              onClick={setTypeItem}
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
            {dataFromApi.map((obj) => {
              if (obj.type === "bun") {
                return (
                  <BurgerIngredient
                    key={obj._id}
                    dataIngredient={obj}
                    count={1}
                    dataInClick={switchModal}
                  />
                );
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
            {dataFromApi.map((obj) => {
              if (obj.type === "sauce") {
                return (
                  <BurgerIngredient
                    key={obj._id}
                    dataIngredient={obj}
                    count={1}
                    dataInClick={switchModal}
                  />
                );
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
            {dataFromApi.map((obj) => {
              if (obj.type === "main") {
                return (
                  <BurgerIngredient
                    key={obj._id}
                    dataIngredient={obj}
                    dataInClick={switchModal}
                    count={1}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

BurgerIngredients.propTypes = {
  dataFromApi: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};

export default BurgerIngredients;
