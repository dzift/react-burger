import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import IngredientDetails from "../ingredient-details/ingredient-details";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={styles.modal} onClick={props.onClose}>
        <IngredientDetails {...props} />
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
