import React from "react";
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import { useDrag } from "react-dnd";
import { TItemObject } from "../../utils/types";
import { Link, useLocation } from "react-router-dom";
import { TLocataionState } from "../../utils/types";

interface IBurgerIngredientProps {
  dataIngredient: TItemObject;
}

const BurgerIngredient = ({ dataIngredient }: IBurgerIngredientProps) => {
  const dataFromApi = useSelector(
    (store) => store.BurgerConstructor.itemConstructor
  );

  const location = useLocation<TLocataionState>();

  const [{ isDrag }, drag] = useDrag({
    type: "NEW_INGREDIENT",
    item: dataIngredient,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });
  const opacity = isDrag ? 0.4 : 1;
  if (isDrag) console.log("isDrag");

  const { image, name, price, type, _id } = dataIngredient;

  const checkCount = () => {
    if (type === "bun") {
      return dataFromApi.bun ? (dataFromApi.bun._id === _id ? 2 : 0) : 0;
    } else {
      if (dataFromApi.ingredients.length !== 0) {
        let itemsArr = dataFromApi.ingredients.reduce((acc: any, item) => {
          const { _id } = item;
          if (!Object.hasOwn(acc, _id)) {
            acc[_id] = 1;
          } else {
            acc[_id] += 1;
          }
          return acc;
        }, {});
        if (itemsArr[_id] !== undefined) {
          return itemsArr[_id];
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
  };

  const count = checkCount();
  return (
    <Link
      className={styles.link}
      to={{
        pathname: `/ingredients/${dataIngredient._id}`,
        state: { background: location },
      }}
      ref={drag}
    >
      <div
        data-cy="ingredient"
        className={`${styles.itemCard} pb-8`}
        style={{ opacity }}
      >
        {count !== 0 && <Counter count={count} size="default" />}
        <img src={image} alt="fff" />
        <div className={styles.itemPrice}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.itemName} text text_type_main-small`}>
          {name}
        </div>
      </div>
    </Link>
  );
};

export default BurgerIngredient;
