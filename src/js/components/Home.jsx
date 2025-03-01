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
      .then((data) => {
        console.log("Datos recibidos:", data); // 📌 Verifica la estructura de la respuesta en la consola
        if (Array.isArray(data)) {
          setTodos(data);
        } else {
          console.error("La API no devolvió un array:", data);
          setTodos([]); // Evitar el error asegurando que sea un array
        }
      })
      .catch((err) => {
        console.error("Error cargando tareas:", err);
        setTodos([]); // Evitar errores en caso de fallo en la carga
      });
  }, []);

  // 🔹 Agregar nueva tarea al backend
  const addTodo = () => {
    if (inputValue.trim() === "") return;

    const newTodo = { label: inputValue, done: false }; // La API espera "label", no "text"

    fetch(API_URL, {
      method: "PUT", // La API requiere "PUT" en lugar de "POST"
      body: JSON.stringify([...todos, newTodo]),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => {
        setTodos([...todos, newTodo]); // Agregar tarea nueva a la lista
        setInputValue(""); // Limpiar input
      })
      .catch((err) => console.error("Error agregando tarea:", err));
  };

  // 🔹 Eliminar tarea del backend
  const handleDelete = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);

    fetch(API_URL, {
      method: "PUT",
      body: JSON.stringify(updatedTodos),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => setTodos(updatedTodos))
      .catch((err) => console.error("Error eliminando tarea:", err));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        placeholder="Nueva tarea..."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTodo();
        }}
      />
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            {item.label}
            <button onClick={() => handleDelete(index)} style={{ marginLeft: "10px" }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
