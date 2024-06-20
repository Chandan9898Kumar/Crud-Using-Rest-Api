import React, { memo } from "react";

import "./dialog.css";
import PropTypes from "prop-types";
const ComponentModal = ({ titleMessage, bodyMessage, cancelText, continueText, handleCancel, handleProceed }) => {
  return (
    <React.Fragment>
      <div className="dialog-backdrop" onClick={() => handleCancel(false)} />

      <div className="modal-container">
        <div className="modal-close-btn">
          <button onClick={() => handleCancel(false)}>X</button>
        </div>

        <div className="modal-title-message">{titleMessage}</div>
        <div className="modal-body-message">{bodyMessage}</div>

        <div className="modal-footer">
          <button id="modal-cancel-button" onClick={() => handleCancel(false)}>
            {cancelText}
          </button>

          <button onClick={handleProceed}>{continueText}</button>
        </div>
      </div>
    </React.Fragment>
  );
};

ComponentModal.propTypes = {
  titleMessage: PropTypes.string.isRequired,
  bodyMessage: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  continueText: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleProceed: PropTypes.func.isRequired,
};
export default memo(ComponentModal);
