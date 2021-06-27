import { userService } from '../../services/userService';

export function loadUsers() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'LOADING_START' });
      const users = await userService.getUsers();
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log('UserActions: err in loadUsers', err);
    } finally {
      dispatch({ type: 'LOADING_DONE' });
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'REMOVE_USER', userId });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}

export function updateUser(newUser) {
  return async (dispatch) => {
    try {
      const loggedInUser = await userService.getById(newUser._id);
      if (loggedInUser) {
        dispatch({ type: 'SET_USER', user: newUser });
        userService.update(newUser);
      }
    } catch (err) {
      console.log('user Actions: err in updateUser', err);
    } finally {
    }
  };
}

export function checkUserLogin() {}

// export function loginUser(user) {
//     return async dispatch => {
//         try {
//             dispatch({ type: 'LOGIN_USER', user })
//         } catch (err) {
//             console.log('user Actions: err in loginUser', err)
//         } finally {
//         }
//     }

// }

export function login(userCreds) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCreds);
      if (user) {
        dispatch({ type: 'SET_USER', user });
        return user;
      }
    } catch (err) {
      console.log('UserActions: err in login', err);
    }
  };
}

export function signup(userCreds) {
  console.log('userCreds is:', userCreds);
  return async (dispatch) => {
    try {
      const user = await userService.signup(userCreds);
      dispatch({ type: 'SET_USER', user });
      return user;
    } catch (err) {
      console.log('UserActions: err in signup', err);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({ type: 'SET_USER', user: null });
    } catch (err) {
      console.log('UserActions: err in logout', err);
    }
  };
}
