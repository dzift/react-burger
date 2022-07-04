import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages";
import styles from "./app.module.css";
import ProtectedRoute from "../protected-route.jsx";
import { getItem } from "../../services/actions/burger-Ingredients.js";
import { getUserData } from "../../services/actions/authorization.js";
import { useDispatch } from "react-redux";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";

const App = () => {
  const dispatch = useDispatch();

  const location = useLocation();
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
              <BurgerIngredients location={location} />
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
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
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
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClose={(e) => history.goBack()}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
};

export default App;
