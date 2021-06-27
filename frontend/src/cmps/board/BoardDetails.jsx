import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadBoard,
  removeBoard,
  setMsg,
  updateBoard,
  updateBoards,
} from '../../store/actions/boardAction';
// import { updateUser, loginUser } from '../../store/actions/userAction'

import { AvatarGroup } from '@material-ui/lab';
import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LibraryBooksOutlinedIcon from '@material-ui/icons/LibraryBooksOutlined';

import { GroupList } from '../group/GroupList';
import { taskService } from '../../services/taskService';
import { groupService } from '../../services/groupService';
import { socketService } from '../../services/socketService';
import { GroupFilter } from '../group/GroupFilter';

import { useHistory } from 'react-router';
import { ActivitiesModal } from './ActivitiesModal';
import { BoardSideNavModal } from './BoardSideNavModal';
import { ChartPreview } from '../chart/ChartPreview';
// import { ModalMsg } from '../ModalMsg';

export function BoardDetails(props) {
  const { activeBoard, boards } = useSelector((state) => state.boardReducer);
  const { loggedInUser } = useSelector((state) => state.userReducer);

  const [isFilterShow, setIsFilterShow] = useState(false);
  const [groupsForDisplay, setGroupsForDisplay] = useState(null);

  const [activities, setActivities] = useState(null);
  const [activeModal, setActiveModal] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [chartShown, setChartShown] = useState(false);
  const [calendarShown, setCalendarShown] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const loadActiveBoard = () => {
    const { boardId } = props.match.params;
    dispatch(loadBoard(boardId));
  };

  useEffect(() => {
    loadActiveBoard();
    setUpListeners();
    socketService.emit('chat topic', props.match.params.boardId);
    return () => {
      socketService.off('update board');
      socketService.off('update boards');
    };
  }, []);

  useEffect(() => {
    if (activeBoard?._id !== props.match.params.boardId) {
      socketService.emit('chat topic', props.match.params.boardId);
      loadActiveBoard();
    }
  }, [props]);

  useEffect(() => {
    findActivities();
  }, [activeBoard]);

  const setUpListeners = () => {
    socketService.on('update board', () => {
      loadActiveBoard();
    });
    socketService.on('update boards', () => {
      dispatch(loadBoard());
      loadActiveBoard();
    });
  };

  const findActivities = () => {
    const userTasks = [];
    activeBoard?.groups.forEach((group) => {
      let tasks = group.tasks.filter((task) =>
        task.members.find((member) => member?._id === loggedInUser._id)
      );
      if (tasks.length) {
        tasks = tasks.map((task) => {
          task.groupName = group.name;
          return task;
        });
        userTasks.push(...tasks);
      }
    });
    setActivities(userTasks);
  };

  const togglemodalActivities = () => {
    if (!activities.length) {
      dispatch(setMsg('No Activities'));
      return;
    }
    setActiveModal(!activeModal);
  };

  const onRemoveBoard = (boardId) => {
    dispatch(removeBoard(boardId));
    if (activeBoard._id === boardId) {
      history.push(`/board/${boards[1]._id}`);
    }
    onToggleModalOptions();
  };

  const onAddGroup = (groupName) => {
    const updatedBoard = groupService.add(groupName, activeBoard);
    dispatch(updateBoard(updatedBoard, 'Add group successfully'));
  };

  const onUpdateGroup = (group) => {
    const updatedBoard = groupService.update(group, activeBoard);
    dispatch(updateBoard(updatedBoard));
  };

  const onRemoveGroup = (groupId) => {
    const updatedBoard = groupService.remove(groupId, activeBoard);
    dispatch(updateBoard(updatedBoard, 'Remove group successfully'));
  };

  const onRemoveTask = (taskId, group) => {
    const updatedBoard = taskService.remove(taskId, activeBoard, group);
    dispatch(updateBoard(updatedBoard, 'Remove task successfully'));
  };

  const onAddTask = (txt, groupId) => {
    const updatedBoard = taskService.add(txt, activeBoard, groupId);
    dispatch(updateBoard(updatedBoard, 'Add task successfully'));
  };

  const onUpdateTask = (task, groupId) => {
    const updatedBoard = taskService.update(task, activeBoard, groupId);
    dispatch(updateBoard(updatedBoard, 'Update task successfully'));
  };

  const onUpdateBoardInfo = (txt, type) => {
    const updatedBoard = { ...activeBoard };
    updatedBoard[type] = txt;
    dispatch(updateBoard(updatedBoard));
    if (type === 'name') dispatch(updateBoards(updatedBoard, boards));
  };
  const handleDragEnd = async (res) => {
    const { source, destination, type } = res;
    const updatedBoard = { ...activeBoard };
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    if (type === 'group') {
      const newGroups = _reorder(
        activeBoard.groups,
        source.index,
        destination.index
      );
      updatedBoard.groups = newGroups;
    } else if (type === 'task') {
      if (destination.droppableId === source.droppableId) {
        var groupIdx = activeBoard.groups.findIndex(
          (group) => group.id === source.droppableId
        );
        const newTasks = _reorder(
          activeBoard.groups[groupIdx].tasks,
          source.index,
          destination.index
        );
        updatedBoard.groups[groupIdx].tasks = newTasks;
      } else if (destination.droppableId !== source.droppableId) {
        const sourceGroup = source.droppableId;
        const destinationGroup = destination.droppableId;
        //remove task from source group
        const sourceGroupIdx = activeBoard.groups.findIndex(
          (group) => group.id === sourceGroup
        );
        const sourceGroupItems = Array.from(
          activeBoard.groups[sourceGroupIdx].tasks
        );
        const [transferedItem] = sourceGroupItems.splice(source.index, 1);
        //add task to destination group
        const destinationGroupIdx = activeBoard.groups.findIndex(
          (group) => group.id === destinationGroup
        );
        const destinationGroupItems = Array.from(
          activeBoard.groups[destinationGroupIdx].tasks
        );
        destinationGroupItems.splice(destination.index, 0, transferedItem);
        //update groups in data
        updatedBoard.groups[sourceGroupIdx].tasks = sourceGroupItems;
        updatedBoard.groups[destinationGroupIdx].tasks = destinationGroupItems;
      }
    }
    dispatch(updateBoard(updatedBoard));
  };

  const _reorder = (list, sourceIdx, destIdx) => {
    const items = Array.from(list);
    const [removedItem] = items.splice(sourceIdx, 1);
    items.splice(destIdx, 0, removedItem);
    return items;
  };

  const toggleFilter = () => {
    setIsFilterShow(!isFilterShow);
  };
  const onToggleModalOptions = () => {
    setIsModalShown(!isModalShown);
  };

  const getGroupsForDisplay = (filterBy) => {
    const { groups } = activeBoard;
    var updateGroups = JSON.parse(JSON.stringify(groups));
    var groupsForDisplay = [];

    if (!filterBy) return setGroupsForDisplay(null);

    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i');
      updateGroups.forEach((group) => {
        if (regex.test(group.name)) groupsForDisplay.push(group);
        else {
          const tasks = group.tasks.filter((task) => regex.test(task.name));
          if (tasks.length) {
            var newGroup = { ...group };
            newGroup.tasks = tasks;
            groupsForDisplay.push(newGroup);
          }
        }
      });
    }
    if (filterBy.groupName) {
      groupsForDisplay = updateGroups.filter(
        (currGroup) => currGroup.name === filterBy.groupName
      );
    }
    if (filterBy.member) {
      groupsForDisplay = updateGroups.filter((currGroup) => {
        const tasks = [];
        currGroup.tasks.forEach((task) => {
          if (
            task.members.some((member) => member.fullname === filterBy.member)
          )
            tasks.push(task);
        });
        if (tasks.length) {
          currGroup.tasks = tasks;
          return currGroup;
        }
        return currGroup;
      });
    }
    if (filterBy.status) {
      groupsForDisplay = updateGroups.filter((currGroup) =>
        _filterByType(currGroup, 'status', filterBy)
      );
    }

    if (filterBy.priority) {
      groupsForDisplay = updateGroups.filter((currGroup) =>
        _filterByType(currGroup, 'priority', filterBy)
      );
    }
    setGroupsForDisplay(groupsForDisplay);
  };

  const _filterByType = (group, type, filterBy) => {
    const tasks = group.tasks.filter((task) => task[type] === filterBy[type]);
    if (tasks.length) {
      group.tasks = tasks;
      return group;
    }
  };

  const toggleViews = (key) => {
    if (key === 'chart') {
      setChartShown(true);
      setCalendarShown(false);
    } else if (key === 'calendar') {
      setCalendarShown(true);
      setChartShown(false);
    } else {
      setChartShown(false);
      setCalendarShown(false);
    }
  };

  if (!activeBoard) return <div>Looks Like This Board Does Not Exist...</div>;
  return (
    <section className='board-details flex col'>
      <div className='board-header-top-container flex col'>
        <div className='board-header-top-left flex'>
          <div
            className='board-name editable'
            contentEditable='true'
            onBlur={(ev) => {
              onUpdateBoardInfo(ev.target.innerText, 'name');
            }}
            suppressContentEditableWarning={true}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter') {
                ev.target.blur();
              }
            }}
          >
            {activeBoard.name}
          </div>
          <div className='board-header-top-right flex'>
            <span>
              <AvatarGroup max={3}>
                {activeBoard.members.map((member) => {
                  return (
                    <Avatar
                      key={member._id}
                      className='avatar'
                      alt={`${member.fullname}`}
                      src={member.imgUrl}
                    />
                  );
                })}
              </AvatarGroup>
            </span>
            <span
              className='activities'
              onClick={() => togglemodalActivities()}
            >
              Activities / {activities?.length}
            </span>
            {activeModal && (
              <ActivitiesModal
                activities={activities}
                activeModal={activeModal}
                togglemodalActivities={togglemodalActivities}
              />
            )}
            {activeModal && <div className='dark-screen ' />}
            <LibraryBooksOutlinedIcon className='libary-icon' />
            {isModalShown && (
              <BoardSideNavModal
                className='board-modal-options'
                board={activeBoard}
                onRemove={onRemoveBoard}
                onToggleModalOptions={onToggleModalOptions}
                // onToggleEditName={}
              />
            )}

            {isModalShown && (
              <div className='screen ' onClick={() => onToggleModalOptions()} />
            )}

            <MoreHorizIcon onClick={() => onToggleModalOptions()} />
          </div>
        </div>
        <span
          className='board-desc editable'
          contentEditable='true'
          onBlur={(ev) => {
            onUpdateBoardInfo(ev.target.innerText, 'desc');
          }}
          suppressContentEditableWarning={true}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter') {
              ev.target.blur();
            }
          }}
        >
          {activeBoard.desc}
        </span>
        <div className='board-header-bottom-container flex space-between'>
          <div>
            <span
              className={`btn-add-view ${
                !chartShown && !calendarShown ? 'active-view' : ''
              }`}
              onClick={() => toggleViews('main')}
            >
              Main Table
            </span>
            <span
              className={`btn-add-view ${chartShown ? 'active-view' : ''}`}
              onClick={() => toggleViews('chart')}
            >
              Chart
            </span>
            <span
              className={`btn-add-view ${calendarShown ? 'active-view' : ''}`}
              onClick={() => toggleViews('calendar')}
            >
              Calendar
            </span>
            <span className='btn-add-view'>+ Add view</span>
          </div>
          <div className='board-creator'>
            <span
              onClick={() => {
                history.push(`/profile/${activeBoard.creator._id}`);
              }}
            >
              Created By: {activeBoard.creator.fullname}
            </span>
          </div>
        </div>
      </div>
      <div className='bottom-right-container flex'>
        <button
          className='btn-add-group'
          onClick={() => onAddGroup('new group')}
        >
          New Group
        </button>
        <GroupFilter
          getGroupsForDisplay={getGroupsForDisplay}
          groups={
            !groupsForDisplay || !groupsForDisplay.length
              ? activeBoard.groups
              : groupsForDisplay
          }
          activeBoard={activeBoard}
          toggleFilter={toggleFilter}
          isFilterShow={isFilterShow}
        />
        <MoreHorizIcon />
      </div>
      {isFilterShow && <div className='screen' onClick={toggleFilter} />}
      {!chartShown && !calendarShown && (
        <GroupList
          groups={
            !groupsForDisplay || !groupsForDisplay.length
              ? activeBoard.groups
              : groupsForDisplay
          }
          onRemoveTask={onRemoveTask}
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          onUpdateGroup={onUpdateGroup}
          onRemoveGroup={onRemoveGroup}
          handleDragEnd={handleDragEnd}
          activeBoard={activeBoard}
          loggedInUser={loggedInUser}
        />
      )}
      {chartShown && (
        <ChartPreview
          groups={
            !groupsForDisplay || !groupsForDisplay.length
              ? activeBoard.groups
              : groupsForDisplay
          }
        />
      )}
      {calendarShown && <div>Calendar</div>}
    </section>
  );
}
