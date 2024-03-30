import React, { useState, useEffect, memo } from "react";
import Modal from "../../Common/Modal/Modal";
const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <React.Fragment>
      <Modal show={showModal} onClose={() => setShowModal(false)} title="Project Manager Application">
        <p>This Page contains all the items which is present.</p>
      </Modal>
      <div style={{ display: "block", textAlign: "right", position: "relative", right: "0px" }}>
        <button
          style={{ width: "100px", height: "30px", border: "none", background: "transparent", fontSize: "20px", color: "cornflowerblue", cursor: "pointer" }}
          onClick={() => setShowModal(!showModal)}
        >
          About
        </button>
      </div>

      <div>This is all project</div>
    </React.Fragment>
  );
};

export default ProjectList;
