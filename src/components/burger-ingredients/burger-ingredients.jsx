import React from "react";
import "./burger-ingredients.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props) => {
  return (
    <div>
      <div>
        <p></p>
      </div>
      <div>
        <img src="URL" />
      </div>
      <div>
        <span>{/* <Test>test</Test> */}</span>
        <img src="URL" />
      </div>
      <div className="">{data.id}</div>
    </div>
  );
};

const data = [
  {
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  },
];

console.log(data);

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
      <ul className="menuIngredients">
        <Ingredient />
      </ul>
    </div>
  );
}

export default BurgerIngredients;
