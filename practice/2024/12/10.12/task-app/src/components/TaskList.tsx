import React from "react";
import { useTaskContext } from "../context/TaskContext";

const TaskList: React.FC = () => {
  const { tasks, deleteTask } = useTaskContext();

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due Date: {task.dueDate}</p>
          <p>Priority: {task.priority}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
