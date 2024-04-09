import React, { useEffect, useState } from "react";
import Input from "../../Common/InputField/Input";
import Button from "../../Common/ButtonComponent/Button";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { createProjectTitle } from "../../Redux/TodoApplication/CreateProjectReducer";

import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "X-Binarybox-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

const CreateProject = () => {
  const navigate = useNavigate();
  const [nameField, setNameField] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const title = useSelector((state) => state.CreateProject);
  const dispatch = useDispatch();

  const styles = {
    head: {
      height: "400px",
      borderRadius: "12px",
      padding: "10px",
      position: "relative",
      width: "100%",
      maxWidth: "500px",
      left: "10%",
      zIndex: 11111,
      boxShadow: "0px 2px 6px #000",
      display: "flex",
      flexDirection: "column",
      transform: "translate(30%, 10%)",
      backgroundColor: "#fff",
      color: "black",
    },
    title: {
      textAlign: "center",
      textTransform: "uppercase",
      textShadow: "0px 1px 20px",
    },
    inputOne: {
      position: "relative",
      top: "10%",
      padding: "10px 10px",
    },
    inputTwo: {
      position: "relative",
      top: "25%",
      padding: "10px 10px",
    },
    button: {
      textAlign: "right",
    },
    errorSuccessText: {
      position: "relative",
      top: "45%",
      display: "grid",
      gridAutoColumns: "minmax(0, 1fr)",
      gridAutoFlow: "column",
    },
    spanError: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
      fontWeight: 550,
      textRendering: "optimizeLegibility",
      outline: " 0px",
      textDecoration: "none",
      border: "0px",
      padding: "10px 18px",
      verticalAlign: "middle",
      boxSizing: "border-box",
      borderRadius: "4px",
      color: "rgb(255, 77, 79)",
      backgroundColor: "rgb(255, 241, 240)",
      borderColor: "rgb(255, 163, 158)",
    },
    spanSuccess: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: "16px",
      fontWeight: 550,
      textRendering: "optimizeLegibility",
      outline: " 0px",
      textDecoration: "none",
      border: "0px",
      padding: "10px 18px",
      verticalAlign: "middle",
      boxSizing: "border-box",
      borderRadius: "4px",
      color: "rgb(82, 196, 26);",
      backgroundColor: "rgb(246, 255, 237)",
      borderColor: "rgb(149, 222, 100)",
    },
  };

  useEffect(() => {
    dispatch(createProjectTitle("View All Projects"));
  }, [dispatch]);

  const handleNameChange = (event) => {
    setNameField(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = async () => {
    setIsSaving(true);
    const payload = {
      name: nameField,
      description: description,
    };
    try {
      const result = await axios.post("/api/projects", payload, config);

      if (result.status === 200) {
        setErrorMessage("");
        setSuccessMessage("Project saved successfully!");
        setDescription("");
        setNameField("");
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    } finally {
      setIsSaving(false);
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
        clearTimeout(timer);
      }, 1000);
    }
  };
  return (
    <div>
      <div style={{ padding: "10px 30px" }}>
        <Button type="submit" variant="primary" size={"lg"} onClick={() => navigate("/todo")}>
          {title.createProjectTitle}
        </Button>
      </div>
      <div style={styles.head}>
        <h2 style={styles.title}> Create A new Project</h2>
        <div style={styles.inputOne}>
          <Input type="text" label="name" height="20px" placeholder="Enter Name" id="name" value={nameField} handleChange={handleNameChange} />
        </div>
        <div style={styles.inputTwo}>
          <Input type="text" label="Description" height="20px" placeholder="Enter Description" id="Description" value={description} handleChange={handleDescriptionChange} />
        </div>
        <div style={styles.errorSuccessText}>
          {errorMessage && <span style={styles.spanError}>{errorMessage.split(".")[0] + "."}</span>}
          {successMessage && <span style={styles.spanSuccess}>{successMessage}</span>}

          <div style={styles.button}>
            <Button isDisabled={isSaving} type="submit" variant="primary" size={"lg"} onClick={handleClick}>
              Proceed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
