import { useState, useEffect, useRef } from "react"
import { TodoPreview } from "./TodoPreview"

export const TodoList = ({todos}) => {

    // useEffect(() => {
    //     console.log('todos from list:', todos)
    // }, [])


    return (
        <section className="todo-list">
            {/* <h3>Todo List</h3> */}
            {todos.map(todo => <TodoPreview todo={todo}/>)}
       

        </section>
    )
}
