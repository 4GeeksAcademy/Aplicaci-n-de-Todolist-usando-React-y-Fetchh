import React, { useEffect, useState } from "react";

const Tareasfetch = () => {

    useEffect(() => {
        console.log("se cargo la pagina")
        cargarTareas()
    }, [])


    const [playaActividades, setPlayaActividades] = useState(["tomar sol", "futbol", "tennis", "nadar"])
    const [tareas, SetTareas] = useState([])

    function cargarTareas() {
        console.log("cargarTareas")
        fetch("https://playground.4geeks.com/todo/users/franco_aguilar")
            .then((response) => response.json())
            .then((data) => SetTareas(data.todos))
    }

    function agregarActividad() {
        console.log("agregarActividad")
        console.log(playaActividades)
        setPlayaActividades([...playaActividades, "tejo"])
        console.log(playaActividades)
    }

    function deleteTask(idToDelete) {
        console.log("deleteTask" + idToDelete)
    }
    return (
        <>
            <h1>Tareasfetch</h1>

            <button onClick={cargarTareas}>cargar tareas</button>

            {playaActividades.map((activity, index) => <p key={activity}> Actividad{index}: {activity}</p>)

            }
            {tareas.map((tarea, index) => <p key={tarea.id}> tarea {index}:{tarea.id} {tarea.label}
                <button onClick={() => deleteTask(tarea.id)}>eliminar tareas</button>
            </p>)}
            <button onClick={agregarActividad}>agregar Actividad</button>
        </>
    )
}


export default Tareasfetch;