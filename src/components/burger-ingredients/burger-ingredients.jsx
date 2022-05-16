import React from "react";
import "./burger-ingredients.css";
import {
  Tab,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../app/utils/data.js";

const Ingredient = (props) => {
  return (
    <div className="item pb-8" key={props.id}>
      <div>
        <img className="itemImg pl-4 pb-1" src={props.image} alt="fff" />
      </div>
      <div className="itemPrice">
        <span className="elementPrice mr-2">{props.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className="text text_type_main-small itemName">{props.name}</div>
    </div>
  );
};

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");

  return (
    <div className="mr-10 burgerIngredients ">
      <div className="pt-10 pb-5 text text_type_main-large">
        Соберите бургер
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "200px 200px 200px" }}
      >
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>

      <div className="menuIngredients ml-4">
        <div className="text text_type_main-medium groupIngridents pb-6 pt-10">
          Булки
        </div>

        <div className="groupIngridents">
          {data.map((obj, index) => {
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

        <div className="text text_type_main-medium groupIngridents pb-6 pt-10">
          Соусы
        </div>

        <div className="groupIngridents">
          {data.map((obj, index) => {
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

        <div className="text text_type_main-medium groupIngridents pb-6 pt-10">
          Начинки
        </div>

        <div className="groupIngridents">
          {data.map((obj, index) => {
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
