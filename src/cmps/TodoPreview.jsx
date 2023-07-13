import { useState, useEffect, useRef } from "react"

export const TodoPreview = ({ todo }) => {



    return (
        <section className="todo-preview">
            <div></div>
            {todo.task}
            {todo.isDone?'✅':'📍'}

        </section>
    )
}
