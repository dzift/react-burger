import { combineReducers } from "redux";
import { reducerBurgerIngredients } from "./burger-Ingredients";
import { reducerBurgerConstructor } from "./burger-constructor";
import { reducerAuthorization } from "./authorization";
import { wsOrderReducer } from "./ws-orders";

export const rootReducer = combineReducers({
  BurgerIngredients: reducerBurgerIngredients,
  BurgerConstructor: reducerBurgerConstructor,
  AuthorizationData: reducerAuthorization,
  ws: wsOrderReducer,
});
