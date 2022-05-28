import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-details.module.css";

const IngredientDetails = (props) => {
  const { onClose, data } = props;
  return (
    <>
      <div className={`${styles.modalHeader} ml-10 mt-10 mr-10`}>
        <div className={`${styles.modalTitle} text text_type_main-large`}>
          Детали ингридиента
        </div>
        <button className={styles.modalButton} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
      </div>
      <div className={`${styles.modalContent} pl-5 pr-5 pb-15`}>
        <div className={`${styles.modalImg} pl-5 pr-5 mb-4`}>
          <img src={data.image_large} alt="fff" />
        </div>

        <div className={`text text_type_main-medium pb-8`}>{data.name}</div>
        <div className={`${styles.modalRow} pb-15`}>
          <div className={`${styles.modalInfo} text text_type_main-default`}>
            <span>Калории,ккал</span> <span>{data.calories}</span>
          </div>
          <div className={`${styles.modalInfo} text text_type_main-default`}>
            <span>Белки,г</span> <span>{data.proteins}</span>
          </div>
          <div className={`${styles.modalInfo} text text_type_main-default`}>
            <span>Жиры,г</span> <span>{data.fat}</span>
          </div>
          <div className={`${styles.modalInfo} text text_type_main-default`}>
            <span>Углеводы,г</span> <span>{data.carbohydrates}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientDetails;
