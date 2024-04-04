import React, { useState, useEffect, memo } from "react";
import Modal from "../../Common/Modal/Modal";
import "./todo.css";
import Button from "../../Common/ButtonComponent/Button";

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

      <div style={{ padding: "50px 30px" }}>
        <div>
          <Button type="submit" variant="primary" size={"lg"}>
            Create New Project{" "}
          </Button>
        </div>
        <div style={{ position: "relative", top: "40px" }}>
          <table className="todo-table">
            <tr>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Actions</th>
            </tr>
            <tr>
              <td>Lois</td>
              <td>Griffin</td>
              <td>$150</td>
            </tr>
            <tr>
              <td>Joe</td>
              <td>Swanson</td>
              <td>$300</td>
            </tr>
            <tr>
              <td>Cleveland</td>
              <td>Brown</td>
              <td>$250</td>
            </tr>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectList;
