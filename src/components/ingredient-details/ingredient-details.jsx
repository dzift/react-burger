import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getItem } from "../../services/actions/burger-Ingredients";

import styles from "./ingredient-details.module.css";
import { useSelector, useDispatch } from "react-redux";

import Preloader from "../preloader/preloader";

const IngredientDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItem());
  }, [dispatch]);

  const { items } = useSelector((store) => store.BurgerIngredients);

  const data = useMemo(() => {
    if (!!items) {
      let ingredient = items.find((el) => el._id === id);
      return ingredient;
    } else {
      return null;
    }
  }, [id, items]);

  return (
    <div className={`${styles.container} `}>
      <div className={`${styles.modalHeader} ml-10 mt-10 mr-10`}>
        <div className="text text_type_main-large">Детали ингредиента</div>
      </div>
      {!!data ? (
        <div className={`${styles.modalContent} pl-5 pr-5 pb-15`}>
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

IngredientDetails.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
  }),
};

export default IngredientDetails;
