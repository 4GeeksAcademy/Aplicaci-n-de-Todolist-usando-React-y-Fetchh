import React, { useState } from 'react';

const Home = () => {

    const [nuevoTodo, setNuevoTodo] = useState("tarea nueva");
    const [todos, setTodos] = useState(["Una Tarea de prueba", "Dos tareas de prueba", "tres tareaa de prueba"])

    const handleclick = () => {
        console.log("Nueva Tarea", nuevoTodo)
        setTodos([...todos, nuevoTodo])


    }


    const deletetask = (indice) => {
        console.log(indice);
        const listaNueva = todos.filter((todo, i) => i !== indice)
        setTodos(listaNueva);
    }

    const handlechange = (event) => {
        setNuevoTodo(event.target.value);
    }
    return (
        <div className="text-center">
            <h1 className="text-center mt-5">
                Todo list usando React y Fetch
            </h1>
            <div className="container">
                <div className="d-flex gap-2">
                    <input type="text" className="form-control" onChange={handlechange} />
                    <button onClick={handleclick} className="btn btn-primary">
                        agregar tarea
                    </button>
                </div>
            </div>
            <p>Nueva Tarea:{nuevoTodo}</p>
            <ul className="list-group">
                {todos.map((todo, indice) => {
                    return (
                        <li className="list-group-item d-flex justify-content-between align-item-center">
                            {todo} <button className="btn btn-danger" onClick={() => deletetask(indice)}>Borrar</button>

                        </li>
                    )
                })}
            </ul>
        </div >

    );
};

export default Home;