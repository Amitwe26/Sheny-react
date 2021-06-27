import React, { useEffect, useState } from 'react';
import { Person, Mail, Phone, Cake, Work } from '@material-ui/icons';

import { Avatar } from '@material-ui/core';
import { AppHeader } from '../cmps/AppHeader';
import { userService } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, updateUser } from '../store/actions/userAction';
import { ListMyWeek } from '../cmps/ListMyWeek';
import { ModalProfile } from '../cmps/profile/ModalProfile';

export function Profile() {
  const { boards } = useSelector((state) => state.boardReducer);
  const { loggedInUser } = useSelector((state) => state.userReducer);
  const [user, setUser] = useState({});
  const [initials, setInitials] = useState('');
  const [isModalShown, setIsModalShown] = useState(false);
  const [keyModal, setKeyModal] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    loadUser();
    getInitials('tak took');
  }, []);

  const loadUser = async () => {
    const user = await userService.getLoggedinUser();
    const initials = getInitials(user.fullname);
    setUser(user);
    setInitials(initials);
  };

  const getInitials = (fullname) => {
    const names = fullname.split(' ');
    const initials = names[0].charAt(0) + names[1].charAt(0);
    return initials.toUpperCase();
  };
  const onRemoveUser = () => {
    dispatch(removeUser(user._id));
  };

  const onUpdateUser = (value) => {
    const newUser = { ...user };
    newUser[keyModal] = value;
    setUser(newUser);
    dispatch(updateUser(newUser));
  };

  const changeInfo = (key) => {
    setIsModalShown(true);
    setKeyModal(key);
  };

  if (user === {}) return <div>Loading...</div>;
  return (
    <React.Fragment>
      <AppHeader />
      <section className='profile flex col space-between'>
        <div className='profile-header flex col align-center'>
          <div>{initials}</div>
          <h1>{user.fullname}</h1>
        </div>
        <div className='profile-main flex '>
          {/* <div className='first-panel '>
            <h2>My Boards</h2>
            <ListMyWeek boards={boards} userId={loggedInUser._id} />
        </div> */}

          {/* <div className='second-panel '>
            <h2>My Tasks</h2>
            <ul className='tasks-list clean-list'>
              <li>from board ⇒ task name </li>
              <li>from board ⇒ task name </li>
              <li>from board ⇒ task name </li>
            </ul>
          </div> */}

          <div className='third-panel'>
            <Avatar
              className='avatar'
              alt={`${user.fullname || 'G'} `}
              src={user.url || 'G'}
            />
            <div className='clean-list'>
              <li onClick={() => changeInfo('fullname', user.fullname)}>
                <Person />
                <span>User name:</span>
                {user.fullname}
              </li>
              <li onClick={() => changeInfo('email', user.email)}>
                <Mail />
                <span>Email:</span>
                {user.email}
              </li>
              <li onClick={() => changeInfo('phone', user.phone)}>
                <Phone />
                <span>Phone:</span>
                {user.phone}
              </li>
              <li onClick={() => changeInfo('birthday', user.birthday)}>
                <Cake />
                <span>Birthday:</span>
                {user.birthday}
              </li>
              <li onClick={() => changeInfo('company', user.company)}>
                <Work />
                <span>Company:</span>
                {user.company}{' '}
              </li>
            </div>
            <button className='btn-remove' onClick={() => onRemoveUser()}>
              Remove user
            </button>
          </div>
        </div>
        {isModalShown && (
          <ModalProfile
            user={user}
            keyModal={keyModal}
            setIsModalShown={setIsModalShown}
            onUpdateUser={onUpdateUser}
          />
        )}
        {isModalShown && <div className='dark-screen-nover'></div>}
      </section>
    </React.Fragment>
  );
}
