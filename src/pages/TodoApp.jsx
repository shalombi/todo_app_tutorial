import { useState, useEffect, useRef } from "react"
import { TodoDetails } from "../cmps/TodoDetilas"
import { TodoList } from "../cmps/TodoList"
import { todoService } from "../services/todo.service"

export const TodoApp = () => {

    const [todos, setTodos] = useState('')
    const [selected, setSelected] = useState('')

    useEffect(() => {
        loadTodos()
    }, [])

    const loadTodos = async () => {
        const todos = await todoService.query()
        console.log('todos:', todos)
        setTodos(todos)
        return todos
    }
    const onAddTodo = async () => {
        const todo = todoService.getEmptyTodo()
        const task = prompt('task?')
        const newTodo = await todoService.save({ ...todo, task })
        setTodos([newTodo, ...todos])
    }

    const onEditTodo = async (todo) => {
        const newTask = prompt('task?')
        const updatedTodo = { ...todo, task: newTask }
        await todoService.save(updatedTodo)

        const updatedTodos = todos.map(t => t._id !== updatedTodo._id ? t : updatedTodo)
        setTodos(updatedTodos)
    }

    const onRemoveTodo = async (todoId) => {
        console.log(todoId)
        const prm = await todoService.remove(todoId)
        const newTodos = todos.filter(t => t._id !== todoId)
        setTodos(newTodos)
    }

    const toggleIsDone = async (todo) => {
        // const newTask = prompt('task?')
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        await todoService.save(updatedTodo)

        const updatedTodos = todos.map(t => t._id !== updatedTodo._id ? t : updatedTodo)
        setTodos(updatedTodos)
    }

    if (!todos.length > 0) return <h1>loading..</h1>
    return (
        <section className="todo-app">
            <h3>Todo App</h3>
            {!selected &&
                <div>
                    <button onClick={onAddTodo}>Add</button>

                    <TodoList
                        todos={todos}
                        onEditTodo={onEditTodo}
                        onRemoveTodo={onRemoveTodo}
                        setSelected={setSelected}
                        toggleIsDone={toggleIsDone}
                    />
                </div>
            }



            {selected &&
                <TodoDetails
                    selected={selected}
                    setSelected={setSelected}
                />}
        </section>
    )
}
