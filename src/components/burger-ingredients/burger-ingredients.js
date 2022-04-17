import React from "react";
import "./burger-ingredients.css";

class BurgerIngredients extends React.Component {
  render() {
    return (
      <div className="mr-10 burgerIngredients ">
        <div className="pt-10 pb-5 text text_type_main-large">
          Соберите бургер
        </div>
        <div className="tabsMenu">
          <div className="tabItem">
            <p>
              <span className="text text_type_main-default">Булки</span>
            </p>
          </div>
          <div className="tabItem">
            <p>
              <span className="text text_type_main-default">Соусы</span>
            </p>
          </div>
          <div className="tabItem">
            <p>
              <span className="text text_type_main-default">Начинки</span>
            </p>
          </div>
        </div>
        <div className="menuIngredients"></div>
      </div>
    );
  }
}

export default BurgerIngredients;
