import { combineReducers } from "redux";
import { reducerBurgerIngredients } from "./burger-Ingredients";
import { reducerModal } from "./modal";
import { reducerBurgerConstructor } from "./burger-constructor";
import { reducerBurgerIngredient } from "./burger-ingredient";

export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredients,
  BurgerIngredient: reducerBurgerIngredient,
  BurgerConstructor: reducerBurgerConstructor,
  Modal: reducerModal,
});
