import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";

const IngredientDetails = ({ onClose }) => {
  const data = useSelector((store) => store.BurgerIngredients.currentItem);

  return (
    <>
      <div className={`${styles.modalHeader} ml-10 mt-10 mr-10`}>
        <div className="text text_type_main-large">Детали ингредиента</div>
        <button className={styles.modalButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
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
    </>
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
  onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;
