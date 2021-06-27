import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveBoard } from '../store/actions/boardAction';
var dateFormat = require('dateformat');

export function TaskToWeek({ board, userId, count, filterBy }) {
  // const [userActive, setUserActive] = useState('')
  const [userTasks, setUserTasks] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    findTasksPerUser(userId);
  }, [filterBy]);

  const findTasksPerUser = (userId) => {
    const { groups } = board;
    const userTasks = [];
    groups.forEach((group) => {
      let tasks = group.tasks.filter((task) =>
        task.members.find((member) => member._id === userId)
      );
      if (tasks.length) {
        tasks = tasks.map((task) => {
          task.groupName = group.name;
          task.boardName = board.name;
          return task;
        });
        userTasks.push(...tasks);
      }
    });
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i');
      const newList = userTasks.filter((task) => regex.test(task.name));
      setUserTasks(newList);
    } else {
      setUserTasks(userTasks);
    }
  };

  const changeDate = (date) => {
    const startDate = dateFormat(date.startDate, 'dd-mm-yyyy');
    const endDate = dateFormat(date.endDate, 'dd-mm-yyyy');
    const localDate = `${startDate} / ${endDate}`;
    return localDate;
  };
  const goToBoard = (board) => {
    dispatch(setActiveBoard(board));
  };
  return (
    <section>
      {userTasks.map((task) => {
        return (
          <div key={task.id} className='tasks-user flex space-between'>
            <div className='left flex col'>
              <span>{task.name}</span>
              <div>
                <Link
                  onClick={() => goToBoard(board)}
                  to={`/board/${board._id}`}
                >{`At: ${task.boardName}`}</Link>
                {'>'}
                <Link
                  onClick={() => goToBoard(board)}
                  to={`/board/${board._id}`}
                >{`${task.groupName}`}</Link>
              </div>
            </div>
            <div className='right flex'>{changeDate(task.dateRange)}</div>
          </div>
        );
      })}
    </section>
  );
}
