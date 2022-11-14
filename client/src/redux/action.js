const setLogInState = (loginState) => {
  return {
    type: 'SET_LOGIN_STATE',
    payload: loginState,
  };
};

const setPermissions = (permissions) => {
  return {
    type: 'SET_PERMISSIONS',
    payload: permissions,
  };
};

export { setLogInState, setPermissions };
