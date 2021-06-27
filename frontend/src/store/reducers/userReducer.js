let localLoggedinUser = {
  isAdmin: false,
  fullname: 'Guest Guestis',
  username: 'Guest',
  email: 'Guest@gmail.com',
  phone: '0524735510',
  birthday: '20/02/2000',
  company: 'Mister Bit.',
  url: '',
  createdAt: Date.now(),
  notifications: [],
};

if (sessionStorage.loggedinUser)
  localLoggedinUser = JSON.parse(sessionStorage.loggedinUser);

const initialState = {
  loggedInUser: localLoggedinUser,
  members: [],
};

export function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'LOGOUT_USER':
      return { ...state, loggedInUser: null };
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
    case 'SET_MEMBERS':
      return { ...state, members: action.members };
    default:
      return state;
  }
}
