import React from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const { children, header, onClose } = props;
  return ReactDOM.createPortal(
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modal_container}>
        <div>{header}</div>
        {children}
      </div>
      <div onClick={onClose}></div>
    </div>,
    modalRoot
  );
};

export default Modal;
