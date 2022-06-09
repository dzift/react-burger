import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import { ADD_ITEM_IN_CONSTRUCTOR } from "../../services/actions/burger-constructor";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const functionDrop = (item) => {
    dispatch({
      type: ADD_ITEM_IN_CONSTRUCTOR,
      item: item,
    });
  };

  return (
    <div>
      <AppHeader />
      <main className={styles.page}>
        <div className={styles.content}>
          <BurgerIngredients />
          <BurgerConstructor onDropHandler={functionDrop} />
        </div>
      </main>
    </div>
  );
};

export default App;
