import { Component } from 'react';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

import { TaskAdd } from '../task/TaskAdd'
import { TaskList } from '../task/TaskList'
import { GroupEdit } from './GroupEdit';
import { ExpandMore } from '@material-ui/icons';
import { GroupProgressBar } from './GroupProgressBar';

export class GroupPreview extends Component {
    state = {
        showModal: false
    }

    toggleModal = () => {
        var { showModal } = this.state;
        showModal = !showModal;
        this.setState({ showModal });
    }

    closeModal = () => {
        this.setState({ showModal: false })
    }

    render() {
        const { group, onAddTask, onRemoveTask, onUpdateTask, onRemoveGroup, onUpdateGroup, handleDragEnd, provided, activeBoard, loggedInUser }
            = this.props;
        const { showModal } = this.state;
        return (
            <section className="group-preview flex col">
                <div className="group-header flex space-between">
                    <div className="group-header-left flex" >
                        <span className="icon-drag" {...provided.dragHandleProps}><DragIndicatorIcon /></span>
                        <ExpandMore onClick={this.toggleModal} className="btn-expand" />
                        {showModal &&
                            <GroupEdit
                                onRemoveGroup={onRemoveGroup}
                                onUpdateGroup={onUpdateGroup}
                                group={group}
                                toggleModal={this.toggleModal}
                            />}
                        <span
                            className="group-name editable"
                            style={{ color: `${group.color}`, fontWeight: 'normal' }}
                            contentEditable="true"
                            onBlur={(ev) => {
                                const updatedGroup = { ...group }
                                updatedGroup.name = ev.target.innerText
                                onUpdateGroup(updatedGroup)

                            }}
                            suppressContentEditableWarning={true}
                            onKeyDown={(ev) => {
                                if (ev.key === 'Enter') {
                                    ev.target.blur()
                                }
                            }}

                        >
                            {group.name}
                        </span>
                    </div>
                    <div className="group-header-right flex">
                        <h5>Members</h5>
                        <h5>Status</h5>
                        <h5>TimeLine</h5>
                        <h5>Priority</h5>
                        <h5>Notes</h5>
                    </div>
                </div>
                <TaskList
                    tasks={group.tasks}
                    group={group}
                    onUpdateTask={onUpdateTask}
                    onRemoveTask={onRemoveTask}
                    handleDragEnd={handleDragEnd}
                    activeBoard={activeBoard}
                    loggedInUser={loggedInUser}
                />
                <TaskAdd
                    onAddTask={onAddTask}
                    groupId={group.id}
                    color={group.color}
                />
                <GroupProgressBar activeBoard={activeBoard} tasks={group.tasks} />
                { showModal && <div className="screen" onClick={this.closeModal}></div>}
            </section >
        )
    }
}
