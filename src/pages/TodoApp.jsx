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


    const onEditTodo = async (todo) => {

        const newTask = prompt('task?')
        const updatedTodo = { ...todo, task: newTask }
        await todoService.save(updatedTodo)

        const updatedTodos = todos.map(t => t._id !== updatedTodo._id ? t : updatedTodo)
        setTodos(updatedTodos)
    }

    const onRemoveTodo = (todoId) => {
        console.log(todoId)
        // todoService.remove(todoId)
    }

    if (!todos.length > 0) return <h1>loading..</h1>
    return (
        <section className="todo-app">
            <h3>Todo App</h3>
            <TodoList
                todos={todos}
                onEditTodo={onEditTodo}
                onRemoveTodo={onRemoveTodo}
            />
        </section>
    )
}
