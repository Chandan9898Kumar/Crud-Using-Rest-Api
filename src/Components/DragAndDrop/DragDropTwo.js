import React, { useState, memo, useRef, useEffect } from "react";

import "./dragDropTwo.css";
import ToolTip from "../../Common/ToolTip/ToolTip";

const CONSTANTS = [
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
];
const DragDropTwo = () => {
  const [inputValue, setInputValue] = useState("");

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("todoItems")) || CONSTANTS);

  const onDragStartItem = useRef();
  const onDragOverItem = useRef();

  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(tasks));
  }, [tasks]);

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
        <button className="drag-drop-button" onClick={handleClick}>
          Add
        </button>
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

//  DRAG & DROP BY CLASS COMPONENT

/**
import React from 'react';
import './style.css';

const CONSTANTS = [
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
  {
    name: 'STORY-4520: Improve performance In Tasks',
    category: 'inProgress',
    bgcolor: '#eeed90',
  },
];

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: JSON.parse(localStorage.getItem('todoItems')) || CONSTANTS,
      process: 'This is Drag & Drop',
    };
    this.onDragStartItemRef = React.createRef();
    this.onDragOverItemRef = React.createRef();

    this.getTask = this.getTask.bind(this);
    this.startDragElement = this.startDragElement.bind(this);
    this.dropDragElement = this.dropDragElement.bind(this);
    this.startEnterDraggable = this.startEnterDraggable.bind(this);
  }

  componentDidUpdate() {
    localStorage.setItem('todoItems', JSON.stringify(this.state.tasks));
  }
  
  startDragElement(event, item, position) {
    this.onDragStartItemRef.current = position;
    event.dataTransfer.setData('itemId', item.name);
  }

  startEnterDraggable(event, item, position) {
    this.onDragOverItemRef.current = position;

    const { tasks } = this.state;

    let elementToBeShifted = tasks[this.onDragStartItemRef.current];
    let exchangeTask = [...tasks];
    exchangeTask.splice(this.onDragStartItemRef.current, 1);
    exchangeTask.splice(this.onDragOverItemRef.current, 0, elementToBeShifted);

    this.onDragStartItemRef.current = this.onDragOverItemRef.current;
    this.onDragOverItemRef.current = null;
    this.setState({ tasks: exchangeTask });
    // console.log(exchangeTask, 'exchangeTask');
  }

  dropDragElement(event, typeOfDrop) {
    let getDroppedItem = event.dataTransfer.getData('itemId');
    const { tasks } = this.state;
    let newTasks = [...tasks];
    newTasks.forEach((items) => {
      if (items.name === getDroppedItem) {
        items.category = typeOfDrop;
      }
    });

    this.setState({ tasks: newTasks });
  }

  getTask() {
    const { tasks } = this.state;
    let tasksToBeRender = {
      inProgress: [],
      complete: [],
    };

    tasks.forEach((item, index) => {
      tasksToBeRender[item.category].push(
        <div
          className="items"
          key={item.name}
          draggable
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragStart={(event) => this.startDragElement(event, item, index)}
          onDragEnter={(event) => this.startEnterDraggable(event, item, index)}
        >
          {index} : {'  '} {item.name}
        </div>
      );
    });

    return tasksToBeRender;
  }

  render() {
    return (
      <div>
        <h1>This is Drag & Drop With Class Component</h1>

        <div className="container">
          <div
            data-theme="progress"
            className="progress"
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => this.dropDragElement(event, 'inProgress')}
          >
            <h1>In Progress</h1>
            {this.getTask().inProgress}
          </div>

          <div
            data-theme="completed"
            className="completed"
            onDragOver={(event) => {
              event.preventDefault();
            }}
            onDrop={(event) => this.dropDragElement(event, 'complete')}
          >
            <h1>Completed</h1>
            {this.getTask().complete}
          </div>
        </div>
      </div>
    );
  }
}

export default App;



//  STYLE.CSS

body {
  box-sizing: border-box;
  top: 0;
  margin: 0;
}

h1 {
  color: plum;
  text-align: center;
  text-decoration: underline;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 2rem;
  line-height: 30px;
}

.container {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 30px;
}

.progress,
.completed {
  background-color: beige;
  width: 100%;
  max-width: 450px;
  border-radius: 10px;
  height: 400px;
  overflow-x: hidden;
  overflow-y: auto;
}

.items {
  background-color: rgb(216, 194, 166);
  padding: 15px 10px;
  margin: 10px 10px;
  font-size: 20px;
  border-radius: 10px;
}

[data-theme='progress'] {
  color: aliceblue;
  background-color: rgb(225, 236, 236);
}

[data-theme='completed'] {
  color: red;
  background-color: rgb(224, 218, 224);
}


 */
