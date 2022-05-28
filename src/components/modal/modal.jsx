import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={props.onClose} />
      <div className={styles.modal} onClick={props.onClose}>
        {props.children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
