import React, { memo } from "react";
import "./modal.css";
import PropTypes from "prop-types";
const ComponentModal = ({ titleMessage, bodyMessage, cancelText, continueText }) => {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="modal-close-btn">
          <button onClick={() => {}}>X</button>
        </div>

        <div className="modal-title-message">{titleMessage}</div>
        <div className="modal-body-message">{bodyMessage}</div>

        <div className="modal-footer">
          <button>{cancelText}</button>

          <button>{continueText}</button>
        </div>
      </div>
    </div>
  );
};

ComponentModal.propTypes = {
  titleMessage: PropTypes.string.isRequired,
  bodyMessage: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  continueText: PropTypes.string.isRequired,
};
export default memo(ComponentModal);
