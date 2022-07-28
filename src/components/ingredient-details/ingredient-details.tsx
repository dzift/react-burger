import { useMemo } from "react";
import { useParams } from "react-router-dom";

import styles from "./ingredient-details.module.css";
import { useSelector } from "../../utils/hooks";

import Preloader from "../preloader/preloader";
import { TItemObject } from "../../utils/types";

const IngredientDetails = () => {
  let { id } = useParams<{ id: string }>();
  const { items } = useSelector((store) => store.BurgerIngredients);

  const data = useMemo(() => {
    if (!!items) {
      let ingredient = items.find((el: TItemObject) => el._id === id);
      return ingredient;
    } else {
      return null;
    }
  }, [id, items]);

  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.modalHeader} mt-10`}>
        <div className="text text_type_main-large">Детали ингредиента</div>
      </div>
      {!!data ? (
        <div className={`${styles.modalContent} `}>
          <div className={`${styles.modalImg} pl-5 pr-5 mb-4`}>
            <img src={data.image_large} alt="fff" />
          </div>

          <div className={`text text_type_main-medium pb-8`}>{data.name}</div>
          <div className={`${styles.modalDetailRow} pb-15`}>
            <div className={`${styles.modalInfo}`}>
              <span className="text text_type_main-default">Калории,ккал</span>
              <span className="text text_type_digits-default">
                {data.calories}
              </span>
            </div>
            <div className={`${styles.modalInfo}`}>
              <span className="text text_type_main-default">Белки, г</span>
              <span className="text text_type_digits-default">
                {data.proteins}
              </span>
            </div>
            <div className={`${styles.modalInfo} `}>
              <span className="text text_type_main-default">Жиры, г</span>
              <span className="text text_type_digits-default">{data.fat}</span>
            </div>
            <div className={`${styles.modalInfo}`}>
              <span className="text text_type_main-default">Углеводы, г</span>
              <span className="text text_type_digits-default">
                {data.carbohydrates}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default IngredientDetails;
