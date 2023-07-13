import { useState, useEffect, useRef } from "react"
import { TodoPreview } from "./TodoPreview"

export const TodoList = ({ todos, onEditTodo, onRemoveTodo }) => {


    return (
        <section className="todo-list">
            
            {todos.map(todo => <TodoPreview
                todo={todo}
                onEditTodo={onEditTodo}
                onRemoveTodo={onRemoveTodo}
            />)}

        </section>
    )
}
