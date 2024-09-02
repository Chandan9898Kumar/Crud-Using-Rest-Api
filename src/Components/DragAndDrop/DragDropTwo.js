import React, { useState, memo, useRef } from "react";

import "./dragDropTwo.css";
import ToolTip from "../../Common/ToolTip/ToolTip";
const DragDropTwo = () => {
  const [inputValue, setInputValue] = useState("");

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

  const onDragStartItem = useRef();
  const onDragOverItem = useRef();

  const handleClick = () => {
    if (!!inputValue.trim().length) {
      const newTasks = [
        {
          name: `STORY-${String(Date.now()).slice(0, 4)} :  ${inputValue}`,
          category: "inProgress",
          bgcolor: "#eeed90",
        },
        ...tasks,
      ];

      setTasks(newTasks);
      setInputValue("");
    }
  };

  /**
   * The `startDragElement` function sets the data transfer id and current position when an item is being
   * dragged.
   * @param event - The `event` parameter is the event object that contains information about the event
   * that occurred, such as a mouse click or key press. In this case, it is likely a drag event related
   * to dragging an element on a web page.
   * @param id - The `id` parameter in the `startDragElement` function is used to identify the element
   * being dragged. It is typically a unique identifier associated with the element being dragged.
   * @param position - Position refers to the current position of the element being dragged. It could be
   * the coordinates (x, y) or any other relevant information that helps determine the starting position
   * of the element.
   */
  const startDragElement = (event, id, position) => {
    onDragStartItem.current = position;
    event.dataTransfer.setData("id", id);
  };

  /**
   * The function `startEnterElement` reorders tasks in a list based on drag and drop events.
   * @param event - The `event` parameter is an object that contains information about the event that
   * occurred, such as the type of event and any associated data. In this context, it is likely an event
   * object related to a drag-and-drop operation.
   * @param item - The `item` parameter in the `startEnterElement` function likely represents the item
   * being dragged or moved within a list of tasks. It is used to identify the specific item that is
   * being interacted with during a drag and drop operation.
   * @param position - Position refers to the index or position of an item in a list or array. In the
   * context of the provided code snippet, the `position` parameter likely represents the position where
   * an element is being dragged and dropped within a list of tasks.
   */

  // reshuffle the list when you finally drop the element over any of the other children. Till now we have the index of the dragged child and the child
  // over which it is being dragged making the reshuffle of our list an easy operation.
  const startEnterElement = (event, item, position) => {
    onDragOverItem.current = position;
    const newTasks = [...tasks];
    const shiftDraggedItem = newTasks[onDragStartItem.current];
    newTasks.splice(onDragStartItem.current, 1);
    newTasks.splice(onDragOverItem.current, 0, shiftDraggedItem);
    onDragStartItem.current = onDragOverItem.current;
    onDragOverItem.current = null;
    setTasks(newTasks);
  };

  /**
   * The `onDrop` function updates the category of a task based on the data transferred during a drag and
   * drop event.
   * @param event - The `event` parameter is an object that represents the event that occurred, such as a
   * drag-and-drop event in this case.
   * @param category - Category is the category to which the task will be moved after the drop event.
   */
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

  /**
   * The function `getAllTasks` iterates through tasks and categorizes them into 'inProgress' and
   * 'complete' arrays based on their category.
   * @returns The `getAllTasks` function is returning an object `itemsToBeRender` with two properties:
   * `inProgress` and `complete`, each containing an array of JSX elements representing tasks.
   */
  const getAllTasks = () => {
    const itemsToBeRender = {
      inProgress: [],
      complete: [],
    };

    tasks.forEach((item, index) => {
      itemsToBeRender[item.category].push(
        <div
          key={item.name}
          onDragStart={(event) => startDragElement(event, item.name, index)}
          onDragEnter={(event) => startEnterElement(event, item, index)}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          draggable
          className="task-card"
          style={{ background: item.bgcolor }}
        >
          {item.name}
        </div>
      );
    });

    return itemsToBeRender;
  };

  return (
    <div className="drag-drop-container">
      <h2 className="drag-drop-header">Drag & Drop Two</h2>
      <div className="action-event">
        <input
        className="drag-drop-input"
          type="text"
          placeholder="Type"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button className="drag-drop-button" onClick={handleClick}>Add</button>
      </div>

      <div className="drag-drop-board">
        <div
          className="draggableElement"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, "inProgress");
          }}
        >
          <ToolTip content={`Total ${getAllTasks().inProgress.length} items are in Progress `} direction="left">
            <div className="task-header">
              In-PROGRESS :{"  "} <span>{getAllTasks().inProgress.length}</span>
            </div>
          </ToolTip>
          {getAllTasks().inProgress}
        </div>

        <div className="draggableElement" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, "complete")}>
          <ToolTip content={`Total ${getAllTasks().complete.length} items are COMPLETED `} direction="right">
            <div className="task-header">
              COMPLETED :{"  "} <span>{getAllTasks().complete.length}</span>
            </div>
          </ToolTip>
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

/**        Drag drop Type 2.

import React, { useState, useRef } from 'react';
import './style.css';

export default function App() {
  const [tasks, setTasks] = useState([
    {
      name: 'STORY-4513: Add tooltip',
      category: 'inProgress',
      bgcolor: 'lightblue',
    },
    {
      name: 'STORY-4547: Fix search bug',
      category: 'inProgress',
      bgcolor: 'lightgrey',
    },
    {
      name: 'STORY-4525: New filter option',
      category: 'complete',
      bgcolor: 'lightgreen',
    },
    {
      name: 'STORY-4526: Remove region filter',
      category: 'complete',
      bgcolor: '#ee9090',
    },
    {
      name: 'STORY-4520: Improve performance',
      category: 'complete',
      bgcolor: '#eeed90',
    },
  ]);
  const draggingItem = useRef();
  const dragOverItem = useRef();

  const onDrop = (event, category) => {
    const getId = event.dataTransfer.getData('id');

    const newTasks = tasks.map((items) => {
      if (items.name === getId) {
        items.category = category;
      }
      return items;
    });

    setTasks([...newTasks]);
  };

  const startDragElement = (event, id, position) => {
    draggingItem.current = position;
    event.dataTransfer.setData('id', id);
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDragEnd = (e) => {
    const listCopy = [...tasks];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = null;
    dragOverItem.current = null;
    setTasks(listCopy);
  };

  const getAllTasks = () => {
    const itemsToBeRender = {
      inProgress: [],
      complete: [],
    };

    tasks.forEach((item, index) => {
      itemsToBeRender[item.category].push(
        <div
          key={item.name}
          draggable
          className="task-card"
          style={{ background: item.bgcolor }}
          onDragStart={(event) => startDragElement(event, item.name, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {item.name}
        </div>
      );
    });

    return itemsToBeRender;
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Hello StackBlitz! Drag & Drop</h1>

      <div className="container">
        <div
          className="progress"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, 'inProgress');
          }}
        >
          <h1>In Progress</h1>
          {getAllTasks().inProgress}
        </div>

        <div
          className="complete"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            onDrop(e, 'complete');
          }}
        >
          <h1>Completed</h1>

          {getAllTasks().complete}
        </div>
      </div>
    </div>
  );
}

*/
