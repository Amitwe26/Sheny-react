import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';

import {
  loadBoards,
  removeBoard,
  addBoard,
  setActiveBoard,
  setMsg,
} from '../store/actions/boardAction';
import { BoardDetails } from '../cmps/board/BoardDetails';
import { BoardSideNav } from '../cmps/board/BoardSideNav';
import { AppHeader } from '../cmps/AppHeader';

import React from 'react';
import { Logo } from '../cmps/Logo';
import { ModalMsg } from '../cmps/ModalMsg';
// import { storageService } from '../services/storageService'

export function BoardApp(props) {
  const { loggedInUser, users } = useSelector((state) => state.userReducer);
  const { boards, activeBoard, msg } = useSelector(
    (state) => state.boardReducer
  );
  const [isLoading, setIsLoadinge] = useState(false);
  const [isLogo, setIsLogo] = useState(false);
  const [msgOpen, setMsgOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    setIsLogo(true);
    setTimeout(async () => {
      await getBoards();
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;
    setIsLoadinge(true);
    setTimeout(() => {
      setIsLoadinge(false);
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  useEffect(() => {
    if (msg) {
      setMsgOpen(true);
      setTimeout(() => {
        setMsgOpen(false);
        dispatch(setMsg(null));
      }, 1700);
    }
    if (msg === 'Add Board successfully') {
      const num = boards.length;
      history.push(`/board/${boards[num - 1]._id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const getBoards = async () => {
    // const dispatch(checkUserLogin())
    await onLoadBoards();
    if (boards && !activeBoard) {
      await onSetActiveBoard();
    }
    setIsLogo(false);
  };

  const onLoadBoards = async () => {
    if (activeBoard) {
      history.push(`/board/${activeBoard._id}`);
    } else {
      dispatch(loadBoards()).then((res) =>
        history.push(`/board/${res[0]._id}`)
      );
    }
  };

  const onSetActiveBoard = async () => {
    dispatch(setActiveBoard(boards[0]));
  };

  const onRemove = async (boardId) => {
    dispatch(removeBoard(boardId));
    if (activeBoard._id === boardId) {
      const num = boards.findIndex(
        (activeBoard) => activeBoard._id === boardId
      );
      history.push(`/board/${boards[num - 1]._id}`);
    }
  };

  const onAdd = async (board, user) => {
    dispatch(addBoard(board, user));
  };

  // if (isLoading) return <img src={logo3} alt="logo" width="300" height="300" />

  return (
    <section className='board-app flex'>
      <AppHeader />
      {isLogo && <Logo />}
      {!isLoading && !isLogo && (
        <section className='board-main flex'>
          <BoardSideNav
            onRemove={(boardId) => onRemove(boardId)}
            onAdd={(board, user) => onAdd(board, user)}
          />
          <Switch>
            <Route path='/board/:boardId' component={BoardDetails} />
          </Switch>
          {<ModalMsg msgOpen={msgOpen} />}
        </section>
      )}
    </section>
  );
}
