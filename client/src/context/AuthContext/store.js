import { createContext, useReducer, useEffect } from 'react';
import rootReducer from './reducer';

const INIT_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

const AuthStore = createContext(INIT_STATE);

const AuthStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, INIT_STATE);
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state.user));
  }, [state]);
  const value = {
    auth: state,
    dispatch,
  };
  return <AuthStore.Provider value={value}>{children}</AuthStore.Provider>;
};

export { AuthStore, AuthStoreProvider };
