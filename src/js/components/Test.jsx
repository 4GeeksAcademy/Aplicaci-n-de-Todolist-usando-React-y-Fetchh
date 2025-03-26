import React, { useState } from "react";

const Test= ()=>{
    function cargarTareas(){
    console.log(`cargar tareas`)
    fetch(``)
    .then((response)=> response.json())
    .then((data)=> console.log(data.todos))
   }
   function agregarTareas(){
    console.log(`agregar tareas`)
    fetch(``)
}

    return(
        <>
        <h1>test</h1>
        <button onClick={cargarTareas}> cargar tareas</button>
        <button onClick={agregarTareas}> agregar tareas</button>
        </>
    )

}
export default Test;