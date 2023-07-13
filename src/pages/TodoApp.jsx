import { useState, useEffect, useRef } from "react"
import { TodoList } from "../cmps/TodoList"
import { todoService } from "../services/todo.service"

export const TodoApp = () => {

    const [todos, setTodos] = useState('')

    const loadTodos = async () => {
        const todos = await todoService.query()
        console.log('todos:', todos)
        setTodos(todos)
        return todos
    }

    if (!todos) loadTodos()


    if (!todos.length > 0) return <h1>loading..</h1>
    return (
        <section className="todo-app">
            <h3>Todo App</h3>
            {/* {todos.map(t => console.log(t))} */}
            <  TodoList todos={todos} />
        </section>
    )
}
