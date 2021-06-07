import { useState } from 'react'
import React from 'react'

export function TaskAdd({ onAddTask, groupId }) {
    const [task, setTask] = useState({ txt: '' })

    const handleChange = (ev) => {
        const { value } = ev.target
        const newTask = { ...task }
        newTask.txt = value;
        setTask(newTask)
    };

    const addTask = (ev) => {
        ev.preventDefault()
        onAddTask(task.txt, groupId)
        const newTask = { txt: '', }
        setTask(newTask)
    }
    return (
        <div>
            <form onSubmit={(ev) => addTask(ev)}>
                <input
                    autoComplete="off"
                    className="input-task"
                    type="text"
                    name="txt"
                    placeholder="+Add"
                    value={task.txt}
                    onChange={(ev) => handleChange(ev)} />
            </form>
        </div>
    )
}

