import React, { useState, useRef } from "react";

import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { Link, useLocation } from "react-router-dom";
import Preloader from "../preloader/preloader";
import { TLocataionState } from "../../utils/types";
import { useSelector } from "react-redux";
import { TItemObject } from "../../utils/types";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const BurgerIngredients = () => {
  const [typeItem, setTypeItem] = useState<string>("Булки");
  const location = useLocation<TLocataionState>();

  const menu = useRef<HTMLHeadingElement>(null);
  const bun = useRef<HTMLHeadingElement>(null);
  const sauce = useRef<HTMLHeadingElement>(null);
  const main = useRef<HTMLHeadingElement>(null);

  const { items, loading, error } = useSelector(
    (store: any) => store.BurgerIngredients
  );

  const handleScroll = () => {
    if (menu.current && bun.current && sauce.current && main.current) {
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

      setTypeItem((prevState: any) =>
        activeType === prevState.current ? prevState.current : activeType
      );
    }
  };

  return (
    <>
      {error && alert("Запрос на сервер не удался!")}
      {loading ? (
        <Preloader />
      ) : (
        <section className="text text_type_main-large pt-10 pb-5 mr-10">
          Соберите бургер
          <div className={styles.tab}>
            <div
              onClick={function () {
                if (bun.current) {
                  bun.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
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
                if (sauce.current) {
                  sauce.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
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
                if (main.current) {
                  main.current.scrollIntoView({
                    behavior: "smooth",
                  });
                }
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
              {items.map((obj: TItemObject) => {
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
                } else {
                  return null;
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
              {items.map((obj: TItemObject) => {
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
                } else {
                  return null;
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
              {items.map((obj: TItemObject) => {
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
                } else {
                  return null;
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
