const initialValue = {
  isLoggedIn: false,
  permissions: []
};

const applyLogInPermissions = (state = initialValue, action) => {
  switch (action.type) {
    case 'SET_LOGIN_STATE':
      return { ...state, isLoggedIn: action.payload };

    case 'SET_PERMISSIONS':
      return { ...state, permissions: action.payload };

    default:
      return state;
  }
};

export default applyLogInPermissions;
