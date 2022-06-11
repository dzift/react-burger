import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { useDispatch } from "react-redux";

import { CLOSE_MODAL } from "../../services/actions/modal";
import { CLEAR_ITEM } from "../../services/actions/burger-ingredient";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children }) => {
  const dispatch = useDispatch();

  const keyEsc = React.useCallback((event) => {
    if (event.key === "Escape") {
      dispatch({
        type: CLOSE_MODAL,
      });
    }
  }, []);

  const modalVisible = () => {
    dispatch({
      type: CLEAR_ITEM,
    });
    dispatch({
      type: CLOSE_MODAL,
    });
  };

  React.useEffect(() => {
    document.addEventListener("keydown", keyEsc);

    return () => {
      document.removeEventListener("keydown", keyEsc);
    };
  }, [keyEsc]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={modalVisible} />
      <div className={styles.modal} onClick={modalVisible}>
        <button
          className={`${styles.modalButton}  ml-10 mt-15 mr-10`}
          onClick={modalVisible}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
