import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home: React.FC = () => (
  <div>
    <TaskForm />
    <TaskList />
  </div>
);

export default Home;
