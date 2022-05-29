import styles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
  return <div className={styles.overlay} onClick={props.onClose}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};
