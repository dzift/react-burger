import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  Feed,
  Order,
} from "../../pages";
import styles from "./app.module.css";
import ProtectedRoute from "../protected-route";
import { getItem } from "../../services/actions/burger-Ingredients";
import { getUserData } from "../../services/actions/authorization";
// import { useDispatch } from "react-redux";
import { useDispatch } from "../../utils/hooks";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";

import { TLocataionState } from "../../utils/types";

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation<TLocataionState>();
  const history = useHistory();
  let background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getItem());
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <main className={styles.page}>
            <div className={styles.content}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/feed" exact={true}>
          <Feed />
        </Route>
        <Route path="/feed/:id">
          <Order />
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>

        <ProtectedRoute path="/profile/orders/:id" exact={true}>
          <Order />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <div className={`${styles.error} mt-30`}>
            <h2>404 ERROR</h2>
          </div>
        </Route>
      </Switch>

      {background && (
        <>
          <Route
            path="/ingredients/:id"
            children={
              <Modal onClose={() => history.goBack()}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path="/feed/:id"
            children={
              <Modal onClose={() => history.goBack()}>
                <Order />
              </Modal>
            }
          />
          <ProtectedRoute
            path="/profile/orders/:id"
            children={
              <Modal onClose={() => history.goBack()}>
                <Order />
              </Modal>
            }
          />
        </>
      )}
    </>
  );
};

export default App;
