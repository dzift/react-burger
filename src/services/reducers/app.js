import { combineReducers } from "redux";
import { reducerBurgerIngredient } from "./burgerIngredients";

export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredient,
});
