import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  const keyEsc = React.useCallback((event) => {
    if (event.keyCode === 27) {
      props.onClose();
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("keydown", keyEsc);

    return () => {
      document.removeEventListener("keydown", keyEsc);
    };
  }, [keyEsc]);

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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
