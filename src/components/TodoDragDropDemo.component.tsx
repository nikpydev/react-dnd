import React, { useState } from "react";

interface Task {
  id: string;
  taskName: string;
  type: string;
  backgroundColor: string;
}

interface Tasks {
  [taskType: string]: Array<any>;
}

const TodoDragDropDemo = () => {
  const [taskList, setTaskList] = useState<Array<Task>>([
    {
      id: "1",
      taskName: "Read book",
      type: "inProgress",
      backgroundColor: "red",
    },
    {
      id: "2",
      taskName: "Pay bills",
      type: "inProgress",
      backgroundColor: "green",
    },
    {
      id: "3",
      taskName: "Go to the gym",
      type: "Done",
      backgroundColor: "blue",
    },
    {
      id: "4",
      taskName: "Play baseball",
      type: "Done",
      backgroundColor: "green",
    },
  ]);

  const onDragStart = (event: React.DragEvent, taskName: string) => {
    console.log("dragstart on div: ", taskName);
    event.dataTransfer.setData("taskName", taskName);
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent, category: string) => {
    let taskName = event.dataTransfer.getData("taskName");

    let tasks = taskList.map((task) => {
      if (task.taskName === taskName) {
        task.type = category;
      }
      return task;
    });

    setTaskList(tasks);
  };

  var tasks: Tasks = {
    inProgress: [],
    Done: [],
  };

  taskList.forEach((task) => {
    tasks[task.type].push(
      <div
        key={task.id}
        onDragStart={(event) => onDragStart(event, task.taskName)}
        draggable
        className="draggable"
        style={{ backgroundColor: task.backgroundColor }}
      >
        {task.taskName}
      </div>
    );
  });

  return (
    <div className="drag-container">
      <h2 className="head">To Do List Drag & Drop</h2>
      <div
        className="inProgress"
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => {
          onDrop(event, "inProgress");
        }}
      >
        <span className="group-header">In Progress</span>
        {tasks.inProgress}
      </div>
      <div
        className="droppable"
        onDragOver={(event) => onDragOver(event)}
        onDrop={(event) => onDrop(event, "Done")}
      >
        <span className="group-header">Done</span>
        {tasks.Done}
      </div>
    </div>
  );
};

export default TodoDragDropDemo;
