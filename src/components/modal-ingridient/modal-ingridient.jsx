import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal-ingridient.module.css";

const modalRoot = document.getElementById("react-modals");

class Modal extends React.Component {
  render() {
    const { children, header, onClose } = this.props;
    // Возвращаем ReactDOM.createPortal,
    // который поместит дочерние элементы в modalRoot
    return ReactDOM.createPortal(
      <>
        <div className={styles.modal}>
          <div className={styles.modal_container} onClose={onClose}>
            {header}
          </div>
          {children}
        </div>
        <div onClose={onClose}></div>
      </>,
      modalRoot
    );
  }
}

export default Modal;
