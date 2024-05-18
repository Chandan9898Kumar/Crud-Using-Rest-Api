import React, { useState, memo } from "react";
import "./dragDropTwo.css";
const DragDropTwo = () => {
  const [tasks, setTasks] = useState([
    { name: "STORY-4513: Add tooltip", category: "inProgress", bgcolor: "lightblue" },
    {
      name: "STORY-4547: Fix search bug",
      category: "inProgress",
      bgcolor: "lightgrey",
    },
    {
      name: "STORY-4525: New filter option",
      category: "complete",
      bgcolor: "lightgreen",
    },
    {
      name: "STORY-4526: Remove region filter",
      category: "complete",
      bgcolor: "#ee9090",
    },
    {
      name: "STORY-4520: Improve performance",
      category: "complete",
      bgcolor: "#eeed90",
    },
  ]);

  const startDragElement = (event, id) => {
    event.dataTransfer.setData("id", id);
  };

  const onDrop = (event, category) => {
    const getId = event.dataTransfer.getData("id");

    const newTasks = tasks.filter((items) => {
      if (items.name === getId) {
        items.category = category;
      }
      return items;
    });

    setTasks([...newTasks]);
  };

  const getAllTasks = () => {
    const itemsToBeRender = {
      inProgress: [],
      complete: [],
    };

    tasks.forEach((item) => {
      itemsToBeRender[item.category].push(
        <div key={item.name} onDragStart={(event) => startDragElement(event, item.name)} draggable className="task-card" style={{ background: item.bgcolor }}>
          {item.name}
        </div>
      );
    });

    return itemsToBeRender;
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">Drag & Drop Two</h2>

      <div className="drag-drop-board">
        <div
          className="draggableElement"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, "inProgress");
          }}
        >
          <div className="task-header">
            In-PROGRESS <span>{getAllTasks().inProgress.length}</span>
          </div>
          {getAllTasks().inProgress}
        </div>

        <div className="draggableElement" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, "complete")}>
          <div className="task-header">
            COMPLETED <span>{getAllTasks().complete.length}</span>
          </div>
          {getAllTasks().complete}
        </div>
      </div>
    </div>
  );
};

export default memo(DragDropTwo);

//   NOTE:

/**
 1. To make the drop target valid, you need to call event.preventDefault() in the  dragover event handlers .

 2. If you don’t do this, the drop event will never fire because the div element is not a valid drop target by default.
 */
