import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, updateUser } from '../store/actions/userAction';
import { Avatar } from '@material-ui/core';

import {
  NotificationsNone,
  AppsOutlined,
  ExitToAppOutlined,
  EventNoteOutlined,
  GitHub,
  LinkedIn,
} from '@material-ui/icons';
import { NotificationModal } from './notification/NotificationModal';
import logo from '../assets/styles/logo/logo.png';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import { socketService } from '../services/socketService';
// import { storageService } from '../services/storageService';

import React from 'react';

export function AppHeader() {
  const { loggedInUser } = useSelector((state) => state.userReducer);
  const [isNotificationModalShown, setIsNotificationModalShown] =
    useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNewNotification, setIsNewNotification] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    socketService.on('board add notification', (notification) => {
      const copyNotifications = [notification, ...loggedInUser.notifications];
      setNotifications(copyNotifications);
      setIsNewNotification(true);
      const newLoggedInUser = { ...loggedInUser };
      newLoggedInUser.notifications = copyNotifications;
      dispatch(updateUser(newLoggedInUser));
    });
    setNotifications(loggedInUser.notifications);
    // console.log('loggedInUser is:', loggedInUser);
    // const logdin = storageService.load('loggedInUser')
    // console.log('sessionStorage.loggedInUser is:', logdin);
    return () => {
      socketService.off('board add notification');
    };
  }, []);

  useEffect(() => {
    setNotifications(loggedInUser.notifications);
  }, [loggedInUser]);
  const toggleShowModal = () => {
    setIsNotificationModalShown(!isNotificationModalShown);
    setIsNewNotification(false);
  };

  const toggleHamburger = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  return (
    <div className='header-main flex'>
      <div className='tab-name'>Hi,{loggedInUser?.fullname || 'Guest'}</div>
      <div className='header-left-panel flex col'>
        <div className='header-left-logo'>
          <Link to='/'>
            <img src={logo} alt='Logo' />
          </Link>
        </div>
        <div className='header-left-top flex col'>
          <Link className='header-item' to='/board' title='My Boards'>
            <AppsOutlined />
          </Link>
          <span
            title='Notifications'
            className='notifications header-item'
            onClick={() => toggleShowModal()}
          >
            <NotificationsNone />
            {isNewNotification && <div className='new-notification'></div>}

            {isNotificationModalShown && (
              <NotificationModal notifications={notifications} />
            )}
          </span>
          {isNotificationModalShown && (
            <div onClick={() => toggleShowModal()} className='screen'></div>
          )}
        </div>
        <div
          className={`header-left-bottom flex col end ${
            !isHamburgerOpen && 'open'
          }`}
        >
          <span className='event-note header-item flex align-center'>
            <Link to='/myweek' title='My week'>
              <EventNoteOutlined />
            </Link>
          </span>
          <span className='person header-item flex align-center'>
            <Link to='/profile' title='My profile'>
              <Avatar
                className='avatar'
                alt={`${loggedInUser?.fullname || 'G'} `}
                src={loggedInUser?.url || 'G'}
              />
            </Link>
          </span>
          <span className='exit-to-app header-item flex align-center'>
            <Link to='' onClick={() => dispatch(logout())} title='Logout'>
              <ExitToAppOutlined />
            </Link>
          </span>
        </div>
      </div>
      <div className='header-right-panel flex col'>
        <div className='header-right-top'></div>
        <div className='header-right-middle flex col align-center'>
          <GitHub className='header-item' />
          <LinkedIn className='header-item' />
        </div>
        <div className='header-right-bottom'></div>
      </div>
      <button className='hamburger' onClick={() => toggleHamburger()}>
        <MenuOutlinedIcon className='hamburger' />
      </button>
      {isHamburgerOpen && (
        <div
          className='dark-screen-nover'
          onClick={() => toggleHamburger()}
        ></div>
      )}
    </div>
  );
}
