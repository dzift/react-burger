import { combineReducers } from "redux";
import { reducerBurgerIngredient } from "./BurgerIngredients";

export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredient,
});
