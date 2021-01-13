import { Component } from 'react'

export class TaskPreview extends Component {

    render() {
        return (
            <div className="task-preview flex space-between">
                <div className="task-left flex">
                    <button>T</button>
                    <h3>name task</h3>
                </div>
                <div className="task-right flex">
                    <p>chat</p>
                    <p>picture</p>
                    <p>status</p>
                    <p>data</p>
                    <p>priority</p>
                </div>

            </div>
        )
    }
}
