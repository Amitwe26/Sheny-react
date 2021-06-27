import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@material-ui/core/Input';
import { login, signup, logout } from '../store/actions/userAction';
import { userService } from '../services/userService';
import { Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FacebookLogin from 'react-facebook-login';

import React from 'react';

export function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [msg, setMsg] = useState('');
  const [loggedinUser, setLoggedinUser] = useState(
    userService.getLoggedinUser()
  );
  const [loginCred, setLoginCred] = useState({ username: '', password: '' });
  const [signupCred, setSignupCred] = useState({
    username: '',
    password: '',
    fullname: '',
    email: '',
    url: '',
  });
  const [isFocus, setIsFocus] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  // const { loggedInUser } = useSelector(state => state.userReducer)

  const loginHandleChange = (ev) => {
    const { name, value } = ev.target;
    const prevState = { ...loginCred };
    prevState[name] = value;
    setLoginCred(prevState);
    // setLoginCred( ...loginCred,loginCred[name]: value)
  };

  const signupHandleChange = (ev) => {
    const { name, value } = ev.target;
    const prevState = { ...signupCred };
    prevState[name] = value;
    setSignupCred(prevState);
  };

  const doLogin = async (ev) => {
    ev.preventDefault();
    const { username, password } = loginCred;
    if (!username || !password) {
      return setMsg('Please enter user/password');
    }
    try {
      const userCreds = { username, password };
      dispatch(login(userCreds)).then((user) => {
        if (user) {
          setLoginCred({ username: '', password: '' });
          history.push('/board');
        }
      });
    } catch (err) {
      setMsg('Login failed, try again.');
    }
  };
  const doSignup = async (ev) => {
    ev.preventDefault();
    const { username, password, fullname, email, url } = signupCred;
    if (!username || !password || !fullname) {
      return setMsg('All inputs are required');
    }
    const signupCreds = { username, password, fullname, email, url };
    try {
      dispatch(signup(signupCreds)).then((user) => {
        if (user) {
          setSignupCred({
            username: '',
            password: '',
            fullname: '',
            email: '',
          });
          history.push('/board');
        }
      });
    } catch {
      this.setState({ msg: 'signup failed, try again.' });
    }
  };

  const newUser = (ev) => {
    ev.preventDefault();
    const lastAns = isNewUser;
    setIsNewUser(!lastAns);
  };

  const responseFacebook = (response) => {
    if (response) {
      const firstName = response.name.split(' ').slice(0, -1).join(' ');
      setSignupCred({
        username: firstName,
        password: '',
        fullname: response.name,
        email: response.email,
        url: response.picture.data.url,
      });
      setIsNewUser(true);
      setIsFocus(true);
      setMsg('Need to create a Password');
    }
  };

  const componentClicked = () => {};

  let loginSection = (
    <form className='login flex col' onSubmit={(ev) => doLogin(ev)}>
      <h2>Login</h2>
      <Input
        type='text'
        name='username'
        autoComplete='off'
        autoFocus='on'
        value={loginCred.username}
        onChange={(ev) => loginHandleChange(ev)}
        placeholder='Username'
      />
      <Input
        id='standard-adornment-password'
        type='password'
        name='password'
        autoComplete='off'
        value={loginCred.password}
        onChange={(ev) => loginHandleChange(ev)}
        placeholder='Password'
      />
      <button className='btn-login'>Login</button>
      <a href='\login' onClick={(ev) => newUser(ev)}>
        Dont have a user? signup
      </a>
      {/* <Button color="primary"><FacebookIcon className="face-icon" />Login with Facebook</Button> */}
      <span className='login-facebook-btn'>
        <FacebookIcon className='face-icon' />
        <FacebookLogin
          appId='4052456894837314'
          autoLoad={false}
          fields='name,email,picture'
          onClick={componentClicked}
          callback={responseFacebook}
        />
      </span>
    </form>
  );
  let signupSection = (
    <form className='signup flex col' onSubmit={(ev) => doSignup(ev)}>
      <h2>Signup</h2>
      <Input
        type='text'
        value={signupCred.username}
        name='username'
        autoComplete='off'
        onChange={(ev) => signupHandleChange(ev)}
        placeholder='Username*'
      />
      <Input
        name='password'
        type='password'
        value={signupCred.password}
        autoComplete='off'
        autoFocus={isFocus}
        onChange={(ev) => signupHandleChange(ev)}
        placeholder='Password*'
      />
      <Input
        type='text'
        name='fullname'
        value={signupCred.fullname}
        autoComplete='off'
        onChange={(ev) => signupHandleChange(ev)}
        placeholder='Full name*'
      />
      <Input
        type='text'
        name='email'
        value={signupCred.email}
        autoComplete='off'
        onChange={(ev) => signupHandleChange(ev)}
        placeholder='Email*'
      />
      <button className='btn-login'>Signup</button>
      <a href='/' onClick={(ev) => newUser(ev)}>
        {' '}
        have a user? login
      </a>
    </form>
  );
  return (
    <div className='login-page'>
      <Link className='arrow-left' data-title={'Back to Home'} to='/'>
        <ArrowBackIcon />
      </Link>
      <section className='login-container'>
        <AccountCircleIcon />
        <p>{msg}</p>
        {loggedinUser && (
          <div>
            <h3>
              Are you sure you want to exit? {loggedinUser.fullname}
              <button className='btn-login' onClick={dispatch(logout())}>
                Logout
              </button>
            </h3>
          </div>
        )}

        {!loggedinUser && !isNewUser && loginSection}
        {!loggedinUser && isNewUser && signupSection}
      </section>
    </div>
  );
}
