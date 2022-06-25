import { combineReducers } from "redux";
import { reducerBurgerIngredients } from "./burger-Ingredients";
import { reducerBurgerConstructor } from "./burger-constructor";
import { reducerBurgerIngredient } from "./burger-ingredient";
import { reducerAuthorization } from "./authorization";
export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredients,
  BurgerIngredient: reducerBurgerIngredient,
  BurgerConstructor: reducerBurgerConstructor,
  AuthorizationData: reducerAuthorization,
});
