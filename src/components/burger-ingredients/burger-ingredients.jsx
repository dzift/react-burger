import { useState, useRef, useEffect } from "react";
import { getItem } from "../../services/actions/burger-Ingredients";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { Link, useLocation } from "react-router-dom";
import Preloader from "../preloader/preloader";

import { useSelector, useDispatch } from "react-redux";

import { CLEAR_ITEM } from "../../services/actions/burger-ingredient";

const BurgerIngredients = () => {
  const [typeItem, setTypeItem] = useState("Булки");
  const location = useLocation();

  const menu = useRef(null);
  const bun = useRef(null);
  const sauce = useRef(null);
  const main = useRef(null);

  const { items, loading, error } = useSelector(
    (store) => store.BurgerIngredients
  );
  // const { currentItem } = useSelector((store) => store.BurgerIngredient);

  const dispatch = useDispatch();

  const handleScroll = () => {
    const bunPosition = Math.abs(
      menu.current.getBoundingClientRect().top -
        bun.current.getBoundingClientRect().top
    );
    const saucePosition = Math.abs(
      menu.current.getBoundingClientRect().top -
        sauce.current.getBoundingClientRect().top
    );
    const mainPosition = Math.abs(
      menu.current.getBoundingClientRect().top -
        main.current.getBoundingClientRect().top
    );

    const viewType = Math.min(bunPosition, saucePosition, mainPosition);

    const activeType =
      viewType === bunPosition
        ? "Булки"
        : viewType === saucePosition
        ? "Соусы"
        : "Начинки";

    setTypeItem((prevState) =>
      activeType === prevState.current ? prevState.current : activeType
    );
  };

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  // const closeModal = () => {
  //   dispatch({
  //     type: CLEAR_ITEM,
  //   });
  // };

  return (
    <>
      {/* {currentItem && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )} */}

      {error && alert("Запрос на сервер не удался!")}
      {loading ? (
        <Preloader />
      ) : (
        <section className="text text_type_main-large pt-10 pb-5 mr-10">
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
          <div
            className={`${styles.menuIngredients} custom-scroll ml-4`}
            ref={menu}
            onScroll={handleScroll}
          >
            <div
              className={`${styles.groupIngredients} text text_type_main-medium pb-6 pt-10`}
              ref={bun}
            >
              Булки
            </div>
            <div className={styles.groupIngredients}>
              {items.map((obj) => {
                if (obj.type === "bun") {
                  return (
                    <Link
                      key={obj._id}
                      to={{
                        pathname: `/ingredients/${obj._id}`,
                        state: { background: location },
                      }}
                      className={styles.link}
                    >
                      <BurgerIngredient key={obj._id} dataIngredient={obj} />
                    </Link>
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
              {items.map((obj) => {
                if (obj.type === "sauce") {
                  return (
                    <Link
                      key={obj._id}
                      to={{
                        pathname: `/ingredients/${obj._id}`,
                        state: { background: location },
                      }}
                      className={styles.link}
                    >
                      <BurgerIngredient key={obj._id} dataIngredient={obj} />
                    </Link>
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
              {items.map((obj) => {
                if (obj.type === "main") {
                  return (
                    <Link
                      key={obj._id}
                      to={{
                        pathname: `/ingredients/${obj._id}`,
                        state: { background: location },
                      }}
                      className={styles.link}
                    >
                      <BurgerIngredient key={obj._id} dataIngredient={obj} />
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BurgerIngredients;
