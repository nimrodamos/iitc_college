import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../types/index.ts";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = async (task: Omit<Task, "id">) => {
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, id: Date.now() }),
    });
    const newTask = await response.json();
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
