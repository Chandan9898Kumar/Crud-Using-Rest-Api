import React, { useState } from "react";
import Input from "../../Common/InputField/Input";
import Button from "../../Common/ButtonComponent/Button";
import { useNavigate } from "react-router-dom";
const CreateProject = () => {
  const navigate = useNavigate();
  const [nameField, setNameField] = useState("");
  const [description, setDescription] = useState("");
  const styles = {
    head: {
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
      display: "block",
      position: "relative",
      top: "50%",
      textAlign: "right",
      padding: "10px 10px",
    },
  };

  const handleNameChange = (event) => {
    setNameField(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleClick = () => {};

  return (
    <div>
      <div style={{ padding: "10px 30px" }}>
        <Button type="submit" variant="primary" size={"lg"} onClick={() => navigate("/todo")}>
          View All Projects
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
        <div style={styles.button}>
          <Button type="submit" variant="primary" size={"lg"} onClick={handleClick}>
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
