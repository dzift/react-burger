import styles from "./modal-overlay.module.css";

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = (props: TModalOverlayProps) => {
  return <div className={styles.overlay} onClick={props.onClose} />;
};

export default ModalOverlay;
