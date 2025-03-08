import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    createUser();
    takeList();
  }, []);

  useEffect(() => {
    sendList();
  }, [todos]);

  const createUser = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/users/franco', {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      const transform = await response.json();
      console.log(transform.msg);
    } catch (e) {
      console.log("error", e);
    }
  };

  const takeList = async () => {
    try {
      const previewResponse = await fetch('https://playground.4geeks.com/todo/users/franco');
      if (!previewResponse.ok) {
        throw Error(previewResponse.statusText);
      }
      const transform = await previewResponse.json();
      console.log("Datos recibidos:", transform);
      setTodos(Array.isArray(transform) ? transform : []);
    } catch (e) {
      console.log("error", e);
      setTodos([]); // Evita el error asignando un array vacío en caso de fallo
    }
  };
    
  const sendList = async () => {
    try {
      const response = await fetch('https://playground.4geeks.com/todo/todos/franco', {
        method: "PUT",
        body: JSON.stringify(todos),
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      if (!response.ok) {
        throw Error(response.statusText);
      }
      
      const transform = await response.json();
      console.log(transform.msg);
    } catch (e) {
      console.log("error", e);
    }
  };

  const pressEnter = async (e) => {
    if (e.key === "Enter" && inputValue !== "") {
      let obj = {
        id: uuidv4(),
        label: inputValue,
        done: false
      };
      setTodos([...todos, obj]);
      setInputValue("");
    }
  };

  const confirmDelete = (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="cont">
      <h1 className="title">Todos</h1>
      <div className="bac-list">
        <ul className="list-group list-group-flush">
          <input
            className="custom-input"
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => pressEnter(e)}
            placeholder="+ New task"
          />
          {todos.map((item) => (
            <div className="li-cont" key={item.id}>
              <li className="list-group-item li-c">
                {item.label}
                <button
                  className="confirm-bu"
                  onClick={() => confirmDelete(item.id)}
                >
                  <i className="fa-solid fa-check fa-beat fa-xl" style={{ color: "#07f702" }}></i>
                </button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <p className="items">Do you have {todos.length} pending tasks</p>
    </div>
  );
};

export default Home;

