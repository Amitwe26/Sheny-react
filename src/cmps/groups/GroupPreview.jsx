import { TaskAdd } from '../tasks/TaskAdd'
import { TaskList } from '../tasks/TaskList'
// import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import { GroupEdit } from './GroupEdit';
import { Component } from 'react';
import { ExpandMore } from '@material-ui/icons';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
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

    render() {
        const { group, onAddTask, onRemoveTask, onUpdateTask, onRemoveGroup, onUpdateGroup, handleDragEnd, provided, activeBoard }
            = this.props;
        const { showModal } = this.state;
        return (
            <section className="group-preview">
                <div className="header-group flex">
                    <div className="header-left flex" >
                        <span className="icon-drag" {...provided.dragHandleProps}><DragIndicatorIcon /></span>
                        <ExpandMore onClick={this.toggleModal} className="btn-expand" />
                        <Icon className="fa fa-plus-circle" color="primary" />
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
                                console.log(ev.target.innerText);
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
                    <div className="header-right flex">
                        <h5>Members</h5>
                        <h5>Status</h5>
                        <h5>Due-date</h5>
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
                />
                <TaskAdd
                    onAddTask={onAddTask}
                    groupId={group.id}
                />
                <GroupProgressBar activeBoard={activeBoard} tasks={group.tasks} />

            </section>
        )
    }
}
