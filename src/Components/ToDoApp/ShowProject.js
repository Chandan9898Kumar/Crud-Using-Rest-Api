import React from "react";
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

  const styles = {
    modal_container: {
      height: "500px",
      borderRadius: "12px",
      padding: "10px",
      margin: "10px auto",
      position: "fixed",
      width: "100%",
      maxWidth: "600px",
      left: "55%",
      top: "50%",
      zIndex: 11111,
      boxShadow: "0px 2px 6px #000",
      display: "flex",
      flexDirection: "column",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
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
      top: "35px",
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
          <div>
            <span style={styles.title}>Project Details</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowProject;
