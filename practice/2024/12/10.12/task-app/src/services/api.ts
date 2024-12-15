import axios from "axios";
import { Task } from "../types";

const API_URL = "http://localhost:3000/tasks";

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};
