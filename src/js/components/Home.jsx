import React, { useState, useEffect } from "react";

const USERNAME = "franco"; // Reemplázalo con tu nombre de usuario único
const API_URL = `https://playground.4geeks.com/todo/todos/${USERNAME}`;

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  // 🔹 Cargar tareas al iniciar
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error cargando tareas:", err));
  }, []);

  // 🔹 Agregar nueva tarea al backend
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = { text: inputValue };

    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]); // Agregar tarea nueva a la lista
        setInputValue(""); // Limpiar input
      })
      .catch((err) => console.error("Error agregando tarea:", err));
  };

  // 🔹 Eliminar tarea del backend
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos(todos.filter((todo) => todo.id !== id)); // Quitar la tarea eliminada
      })
      .catch((err) => console.error("Error eliminando tarea:", err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        <input
          type="text"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{" "}
            <button onClick={() => handleDelete(todo.id)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
