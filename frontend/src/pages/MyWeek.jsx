import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { loadBoards } from '../store/actions/boardAction';
import { AppHeader } from '../cmps/AppHeader';
import { ListMyWeek } from '../cmps/ListMyWeek';
import Calendar from '../assets/icons/calendar.png';

export function MyWeek() {
  const { loggedInUser } = useSelector((state) => state.userReducer);
  const { boards } = useSelector((state) => state.boardReducer);
  const [boardsForDisplay, setBoardsForDisplay] = useState(null);
  const [isTaskShown, setIsTaskShown] = useState(true);
  const [filterBy, setFilterBy] = useState({ txt: '' });
  const [counter, setCounter] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadBoards());
    if (!boards || !boards.length) {
      return;
    }
  }, []);

  const toggleTasksMode = () => {
    setIsTaskShown(!isTaskShown);
  };

  const handleChange = (ev) => {
    const filter = { ...filterBy };
    filter.txt = ev.target.value;
    setFilterBy(filter);
    // getBoardsForDisplay(filter);
  };

  const getBoardsForDisplay = (filter) => {
    // if (!filterBy) return setBoardsForDisplay(null);
    // const regex = new RegExp(filter.txt,'i')
  };

  const count = (num) => {
    const newCounter = [...counter];
    newCounter.push(num);
    setCounter(newCounter);
    console.log('newCounter is:', counter);
  };

  return (
    <React.Fragment>
      <AppHeader />
      <section className='my-week'>
        <div className='top flex space-around align-center'>
          <img src={Calendar} alt='' />
          <h2>
            Hey {loggedInUser.username} ,You have {counter} assignments this
            week
          </h2>
        </div>
        <Input
          type='text'
          name='name'
          autoComplete='off'
          placeholder='Search'
          onChange={(ev) => handleChange(ev)}
        />
        <div className='bottom'>
          <div className='flex space-between'>
            <p>Tasks For You:</p>
            <Button onClick={() => toggleTasksMode()}>
              {isTaskShown ? 'Close tasks' : 'Open tasks'}
            </Button>
          </div>
          {isTaskShown && (
            <ListMyWeek
              boards={boards}
              filterBy={filterBy}
              count={count}
              userId={loggedInUser._id}
            />
          )}
        </div>
      </section>
    </React.Fragment>
  );
}
