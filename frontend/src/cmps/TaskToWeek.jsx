import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
var dateFormat = require('dateformat')

export function TaskToWeek({ board, userId }) {
    // const [userActive, setUserActive] = useState('')
    const [userTasks, setUserTasks] = useState([])

    useEffect(() => {
        findTasksPerUser(userId)
    }, [])

    const findTasksPerUser = (userId) => {
        // const { board } = this.state
        const { groups } = board
        const userTasks = []
        groups.forEach(group => {
            let tasks = group.tasks.filter(task => task.members.find(member => member._id === userId))
            if (tasks.length) {
                tasks = tasks.map(task => {
                    task.groupName = group.name
                    task.boardName = board.name
                    return task;
                })
                userTasks.push(...tasks)
            }
        })
        setUserTasks(userTasks)
    }

    const changeDate = (date) => {
        const startDate = dateFormat(date.startDate, "dd-mm-yyyy")
        const endDate = dateFormat(date.endDate, "dd-mm-yyyy")
        const localDate = `${startDate} / ${endDate}`
        return localDate
    }

    return (
        <section>
            {userTasks.map(task => {
                return (
                    <div key={task.id} className="tasks-user flex space-between">
                        <div className="left flex col">
                            <span>{task.name}</span>
                            <div>
                                <Link to={`/board/${board._id}`}>{`At: ${task.boardName}`}</Link>
                                {'>'}
                                <Link to={`/board/${board._id}`}>{`${task.groupName}`}</Link>
                            </div>
                        </div>
                        <div className="right flex">
                            {changeDate(task.dateRange)}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}