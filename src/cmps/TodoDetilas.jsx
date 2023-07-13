import { useState, useEffect, useRef } from "react"
// import { NavLink, useNavigate } from "react-router-dom";

export const TodoDetails = ({ selected, setSelected }) => {
    // const navigate = useNavigate()

    const onBack = () => {
        //  ()
    }
    return (
        <section className="todo-details">
            <h1>Todo Details</h1>
            <h3>task: {selected.task}</h3>
            <button onClick={() => setSelected('')}>Back</button>
        </section>
    )
}
