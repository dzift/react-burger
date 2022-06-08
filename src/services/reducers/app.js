import { combineReducers } from "redux";
import { reducerBurgerIngredient } from "./burger-Ingredients";

export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredient,
});
