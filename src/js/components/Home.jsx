import React, { useState, useEffect } from 'react';

const Home = () => {




    const [nuevoTodo, setNuevoTodo] = useState("");
    const [todos, setTodos] = useState([])

    function cargarTareas() {
        console.log("cargarTareas")
        fetch("https://playground.4geeks.com/todo/users/franco_aguilar")
            .then((response) => response.json())
            .then((data) => setTodos(data.todos))
        //.then((data) => console.log(data.todos))
    }


    function agregarTarea() {
        fetch("https://playground.4geeks.com/todo/todos/franco_aguilar", {
            method: "POST",
            body: JSON.stringify(
                {
                    "label": nuevoTodo,
                    "is_done": false
                }
            ),
            headers: { "Content-Type": "application/json" }
        })
            .then(response => {
                if(response.status==201){
                    return response.json()
                }
            })
            .then(data => {
                if(data){
                    setTodos(todos.concat(data)) 
                }
            })
    }


    const deletetask = (id) => {
        fetch("https://playground.4geeks.com/todo/todos/"+id, {
            method: "DELETE",
        })
            .then(response => {
                //if(response.status==200){
                    return response
                //}
            })
            .then(data => {
                //if(data){
                    setTodos(todos.filter((todo) => todo.id !== id)) 
                //}
            })
       
    }

    const handlechange = (event) => {
        setNuevoTodo(event.target.value);
    }

    useEffect(() => {
        console.log("se cargo la pagina")
        cargarTareas()
    }, [])

    return (
        <div className="text-center">
            <h1 className="text-center mt-5">
                Todo list usando React y Fetch
            </h1>
            <div className="container">
                <div className="d-flex gap-2">
                    <input type="text" className="form-control" onChange={handlechange} />
                    <button className='btn btn-primary' onClick={agregarTarea}>Agregar Tarea</button>

                </div>
            </div>
            <p>Nueva Tarea:{nuevoTodo}</p>
            <ul className="list-group">
                {todos.map((todo) => {
                    return (
                        <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                            {todo.label}
                            <button className="btn btn-danger" onClick={() => deletetask(todo.id)}>Borrar</button>

                        </li>
                    )
                })}
            </ul>

        </div >

    );
};

export default Home;