import { useState, useEffect, useRef } from "react"

export const TodoPreview = ({ todo, onEditTodo, onRemoveTodo, setSelected,toggleIsDone }) => {


    return (
        <section className="todo-preview flex flex-columns">

            <div>📌 {todo.task}</div>
            <div>status : {todo.isDone ? 'Done  ✅' : 'Active  📍'}</div>
            <button onClick={() => onEditTodo(todo)}>Edit</button>
            <button onClick={() => onRemoveTodo(todo._id)}>x</button>
            <button onClick={() => setSelected(todo)}>select</button>
            <button onClick={() => toggleIsDone(todo)}>SIGN AS DONE</button>



        </section >
    )
}
