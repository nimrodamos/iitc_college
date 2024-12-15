import React, { useState } from "react";
import { Todo } from "./types";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTodo = () => {
    if (!newTodo.trim() || todos.some((todo) => todo.text === newTodo.trim())) {
      alert("Empty or duplicate todos are not allowed.");
      return;
    }

    const newTask: Todo = {
      id: Math.random().toString(),
      text: newTodo.trim(),
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Todo App</h1>

      {/* הוספת משימה חדשה */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Type a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={addTodo} style={{ padding: "5px 10px" }}>
          Add Todo
        </button>
      </div>

      {/* סינון משימות */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            background: filter === "all" ? "lightblue" : "",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            background: filter === "active" ? "lightblue" : "",
          }}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            padding: "5px 10px",
            background: filter === "completed" ? "lightblue" : "",
          }}
        >
          Completed
        </button>
      </div>

      {/* רשימת משימות */}
      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo.id)}
              style={{ marginRight: "10px" }}
            />
            {todo.text}
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{
                marginLeft: "auto",
                padding: "5px 10px",
                background: "red",
                color: "white",
                border: "none",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* כפתור לניקוי המשימות שהושלמו */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={clearCompleted}
          style={{
            padding: "10px 20px",
            background: "darkred",
            color: "white",
            border: "none",
          }}
        >
          Clear Completed Todos
        </button>
      </div>
    </div>
  );
};

export default App;
