import React, { useState, useEffect } from "react";
import Modal from "../../Common/Modal/Modal";
import "./todo.css";
import Button from "../../Common/ButtonComponent/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShowIcon, EditIcon, DeleteIcon } from "../../Assets/SvgImage";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    "X-Binarybox-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

const ProjectList = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [error, setError] = useState("");

  const fetchProjectList = async () => {
    try {
      const result = await axios.get("/api/projects", config);
      setProjectList(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const handleDeleteProject = (id) => {
    
  };

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
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectList.map((project, index) => {
                return (
                  <tr key={index}>
                    <td>{project.name}</td>
                    <td>{project.description}</td>
                    <td style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <Link to={`/show/${project.id}`}>
                        <ShowIcon />
                      </Link>
                      <Link to={`/edit/${project.id}`}>
                        <EditIcon />
                      </Link>
                      <Button color='color: rgb(143 137 137)' background='transparent' type="submit" variant="warning" size="sm" onClick={() => handleDeleteProject(project.id)}>
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectList;
