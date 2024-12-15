export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Pending" | "In Progress" | "Completed";
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => Promise<void>;
}
