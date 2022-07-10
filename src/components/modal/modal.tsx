import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot: Element | null = document.getElementById("react-modals");

type TModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: TModalProps) => {
  const keyEsc = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyEsc);
    return () => {
      document.removeEventListener("keydown", keyEsc);
    };
  }, [keyEsc]);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <>
        <ModalOverlay onClose={onClose} />
        <div className={styles.modal}>
          <button
            className={`${styles.modalButton}  ml-10 mt-15 mr-10`}
            onClick={onClose}
          >
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
      </>,
      modalRoot
    )
  );
};

export default Modal;
