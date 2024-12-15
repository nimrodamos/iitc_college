import React, { createContext, useState, useEffect, useContext } from "react";
import { Task } from "../types/TaskTypes";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: number) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider: React.FC = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.json())
      .then(setTasks)
      .catch(console.error);
  }, []);

  const addTask = (task: Task) => {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() => setTasks((prev) => [...prev, task]));
  };

  const updateTask = (task: Task) => {
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    }).then(() =>
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...task } : t)))
    );
  };

  const deleteTask = (id: number) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    }).then(() => setTasks((prev) => prev.filter((task) => task.id !== id)));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTaskContext must be used within a TaskProvider");
  return context;
};
