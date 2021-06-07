import { TaskPreview } from "./TaskPreview";
import { Droppable, Draggable } from 'react-beautiful-dnd';


export function TaskList({ tasks, group, onRemoveTask, onUpdateTask, activeBoard, loggedInUser, onUpdateUser }) {
    return (
        <section>
            <Droppable droppableId={group.id} type="task">
                {(provided) => (
                    <div className="task-list flex col" {...provided.droppableProps} ref={provided.innerRef}>
                        {tasks.map((task, index) => {
                            return (
                                <Draggable key={task?.id} draggableId={task?.id} index={index}>
                                    {(provided) => (
                                        <div {...provided.draggableProps} ref={provided.innerRef}>
                                            <TaskPreview
                                                key={task?.id}
                                                task={task}
                                                group={group}
                                                onRemoveTask={onRemoveTask}
                                                onUpdateTask={onUpdateTask}
                                                provided={provided}
                                                activeBoard={activeBoard}
                                                loggedInUser={loggedInUser}
                                                onUpdateUser={onUpdateUser}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </section >
    )
}
