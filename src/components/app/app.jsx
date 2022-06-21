import { Switch, Route } from "react-router-dom";
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

const App = () => {
  return (
    <>
      <AppHeader />
      <Switch>
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
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route>
          <div className={`${styles.error} mt-30`}>
            <h2>404 ERROR</h2>
          </div>
        </Route>
      </Switch>
    </>
  );
};

export default App;
