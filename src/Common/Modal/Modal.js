import React from "react";

import modalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
const Modal = ({ children, show, onClose, title }) => {
  return (
    show && (
      <React.Fragment>
        {/*  NOTE : Here i have given a self-closing div element, so that when user click on this div then this onClick event gets fired. It is outside og below Div element */}
        <div className={modalStyle.modal_backdrop} onClick={onClose} />

        <div className={`${modalStyle.modal_wrapper} ${show ? modalStyle.modal_active : ""}`}>
          <div className={modalStyle.modal_header}>
            <div className={modalStyle.modal_title}>{title}</div>
            <div onClick={onClose} className={modalStyle.modal_close}>
              X
            </div>
          </div>

          <div className={modalStyle.modal_body}>{children}</div>
        </div>
      </React.Fragment>
    )
  );
};

Modal.propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  title: PropTypes.string,
};
export default Modal;

/**
 *
 * A modal is a popup that is fixed on the screen and center-aligned both vertically and horizontally, that is used to show details of anything.
 */
