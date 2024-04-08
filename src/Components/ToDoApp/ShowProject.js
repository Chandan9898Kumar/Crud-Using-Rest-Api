import React, { useEffect, useState } from "react";
import Button from "../../Common/ButtonComponent/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { NotFoundIcon } from "../../Assets/SvgImage";
import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const config = {
  headers: {
    "X-Binarybox-Api-Key": process.env.REACT_APP_API_KEY,
  },
};

const ShowProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const ERROR_MESSAGE = "Data you are looking for is not available.";
  const [projectDetails, setProjectDetails] = useState({});
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const result = await axios.get(`/api/projects/${id}`, config);
        setProjectDetails(result.data);
        setIsError("");
      } catch (error) {
        setIsError(error.response.data);
      }
    };

    fetchProjectDetails();
  }, [id]);

  const styles = {
    modal_container: {
      height: "470px",
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
      fontSize: "30px",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
      alignItems: "baseline",
      textTransform: "uppercase",
      textShadow: "2px 2px 4px #000000",
    },
    icon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "relative",
      top: "30px",
    },
    error: {
      fontSize: "30px",
      fontWeight: 700,
      position: "relative",
      top: "50px",
    },
    apiError: {
      left: "38%",
      color: "red",
      fontSize: "30px",
      fontWeight: 700,
      position: "relative",
    },
    sub_container: {
      display: "grid",
      gridAutoColumns: "minmax(0, 1fr)",
      gridAutoFlow: "column",
      position: "relative",
      top: "20px",
      padding: "10px 20px",
    },
    paragraph: {
      fontSize: "20px",
      fontWeight: 600,
      textAlign: "left",
      textTransform: "uppercase",
    },
  };

  return (
    <div>
      <div style={{ padding: "10px 30px" }}>
        <Button type="submit" variant="primary" size={"lg"} onClick={() => navigate("/todo")}>
          View All Projects
        </Button>
      </div>
      {id === "undefined" ? (
        <div style={styles.icon}>
          <NotFoundIcon />
          <div style={styles.error}>{ERROR_MESSAGE}</div>
        </div>
      ) : (
        <div style={styles.modal_container}>
          <span style={styles.title}>Project Details</span>

          <div style={styles.sub_container}>
            <p style={styles.paragraph}>Created At</p>
            <p>{projectDetails.created_at}</p>
          </div>

          <div style={styles.sub_container}>
            <p style={styles.paragraph}>Updated At</p>
            <p>{projectDetails.updated_at}</p>
          </div>

          <div style={styles.sub_container}>
            <p style={styles.paragraph}>description</p>
            <p>{projectDetails.description}</p>
          </div>

          <div style={styles.sub_container}>
            <p style={styles.paragraph}>Name</p>
            <p>{projectDetails.name}</p>
          </div>

          <div style={styles.sub_container}>
            <p style={styles.paragraph}>Id</p>
            <p>{projectDetails.id}</p>
          </div>
        </div>
      )}
      {isError && <div style={styles.apiError}>{isError}</div>}
    </div>
  );
};

export default ShowProject;
