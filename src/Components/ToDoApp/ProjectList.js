import React, { useState, useEffect } from "react";
import Modal from "../../Common/Modal/Modal";
import "./todo.css";
import Button from "../../Common/ButtonComponent/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ShowIcon, EditIcon, DeleteIcon } from "../../Assets/SvgImage";
import ComponentModal from "../../Common/DialogBox/DialogBox";
import { useSelector, useDispatch } from "react-redux";
import { ProjectListTitle } from "../../Redux/TodoApplication/ProjectListReducer";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const config = {
  headers: {
    "X-Binarybox-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

const ProjectList = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const [isDialog, setIsDialog] = useState(false);
  const [projectId, setProjectId] = useState("");

  const title = useSelector((state) => state.BaseProjectComponent);
  const dispatch = useDispatch();

  const fetchProjectList = async () => {
    try {
      const result = await axios.get("/api/projects", config);
      setProjectList(result.data);
      setIsError("");
    } catch (err) {
      setIsError(err);
    }
  };

  useEffect(() => {
    fetchProjectList();
    dispatch(ProjectListTitle("This Page contains all the items which is present."));
  }, [dispatch]);

  const handleDeleteProject = async () => {
    try {
      const isProjectDeleted = await axios.delete(`/api/projects/${projectId}`, config);
      if (isProjectDeleted.status === 200) {
        setIsSuccess("Item Deleted");
        setIsDialog(false);
        setIsError("");
        fetchProjectList();
      }
    } catch (err) {
      setIsError(err);
    }
  };

  const handleSubmit = (id) => {
    setIsDialog(true);
    setProjectId(id);
  };

  return (
    <div>
      {isDialog && (
        <ComponentModal
          titleMessage="Are you sure?"
          bodyMessage="You won't be able to revert this!"
          cancelText={"Cancel"}
          continueText={"Yes, Delete it"}
          handleCancel={() => setIsDialog(false)}
          handleProceed={handleDeleteProject}
        />
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} title="Project Manager Application">
        <p>{title.projectTitle}</p>
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
          <Button type="submit" variant="primary" size={"lg"} onClick={() => navigate("/create-app")}>
            Create New Project
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
                      <Link to={`/show/${project.id}`} style={{ color: "#b39e9e" }}>
                        <ShowIcon />
                      </Link>
                      <Link to={`/edit/${project.id}`} style={{ color: "#b39e9e" }}>
                        <EditIcon />
                      </Link>
                      <Button color="color: rgb(143 137 137)" background="transparent" type="submit" variant="warning" size="sm" onClick={() => handleSubmit(project.id)}>
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
    </div>
  );
};

export default ProjectList;
