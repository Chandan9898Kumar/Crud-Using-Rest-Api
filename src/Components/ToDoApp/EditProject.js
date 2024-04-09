import React, { useState, useEffect, useCallback } from "react";
import Button from "../../Common/ButtonComponent/Button";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Common/InputField/Input";
import axios from "axios";
import LoadComponent from "../../Common/LoadingComponent/LoadComponent";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "X-Binarybox-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nameField, setNameField] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const styles = {
    editHead: {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    subHead: {
      width: "500px",
      height: "450px",
      borderRadius: "12px",
      boxShadow: "0px 2px 6px #000",
      backgroundColor: "#fff",
    },
    title: {
      textAlign: "center",
      textTransform: "uppercase",
      textShadow: "0px 1px 20px",
    },
    inputOne: {
      position: "relative",
      top: "10%",
      padding: "10px 20px",
    },
    inputTwo: {
      position: "relative",
      top: "25%",
      padding: "10px 20px",
    },
    button: {
      position: "relative",
      textAlign: "right",
    },
    errorSuccessText: {
      position: "relative",
      top: "45%",
      display: "grid",
      gridAutoColumns: "minmax(0, 1fr)",
      gridAutoFlow: "column",
      padding: "15px 20px",
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
      padding: "5px 10px",
      verticalAlign: "middle",
      boxSizing: "border-box",
      borderRadius: "4px",
      color: "rgb(255, 77, 79)",
      backgroundColor: "rgb(255, 241, 240)",
      borderColor: "rgb(255, 163, 158)",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
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
      padding: "10px 15px",
      verticalAlign: "middle",
      boxSizing: "border-box",
      borderRadius: "4px",
      color: "rgb(82, 196, 26)",
      backgroundColor: "rgb(246, 255, 237)",
      borderColor: "rgb(149, 222, 100)",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  };

  const fetchProjectDetails = useCallback(async () => {
    try {
      const result = await axios.get(`/api/projects/${id}`, config);
      setNameField(result.data.name);
      setDescription(result.data.description);
      setErrorMessage("");
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  }, [id]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  const handleNameChange = (event) => {
    setNameField(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    const payload = {
      name: nameField,
      description: description,
    };
    try {
      const result = await axios.patch(`/api/projects/${id}`, payload, config);
      setNameField(result.data.name);
      setDescription(result.data.description);
      setSuccessMessage("Successfully Updated.");
    } catch (error) {
      if (error?.response?.data?.message) {
        setErrorMessage(error?.response?.data?.message);
      } else {
        setErrorMessage(error.response.data);
      }
    } finally {
      setIsSaving(false);
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
        clearTimeout(timer);
      }, 2000);
    }
  };
  return (
    <div style={{ padding: "10px 20px" }}>
      <Button type="submit" variant="primary" size={"lg"} onClick={() => navigate("/todo")}>
        View All Projects
      </Button>

      <div style={styles.editHead}>
        <LoadComponent load={isLoading}>
          <div style={styles.subHead}>
            <h2 style={styles.title}>Edit Project</h2>
            <div style={styles.inputOne}>
              <Input type="text" label="name" height="20px" placeholder="Enter Name" id="name" value={nameField} handleChange={handleNameChange} />
            </div>
            <div style={styles.inputTwo}>
              <Input type="text" label="Description" height="20px" placeholder="Enter Description" id="Description" value={description} handleChange={handleDescriptionChange} />
            </div>

            <div style={styles.errorSuccessText}>
              {errorMessage && <span style={styles.spanError}>{errorMessage}</span>}
              {successMessage && <span style={styles.spanSuccess}>{successMessage}</span>}
              <div style={styles.button}>
                <Button type="submit" variant="primary" size={"lg"} onClick={handleUpdate} isDisabled={isSaving}>
                  Update
                </Button>
              </div>
            </div>
          </div>
        </LoadComponent>
      </div>
    </div>
  );
};

export default EditProject;
