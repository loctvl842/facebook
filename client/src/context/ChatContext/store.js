import { createContext, useReducer } from 'react';
import rootReducer from './reducer';

const INIT_STATE = {
  rooms: [],
  roomActive: null,
  isFetching: false,
  error: false,
};

const ChatStore = createContext(INIT_STATE);

const ChatStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, INIT_STATE);
  const value = {
    chat: state,
    dispatch,
  };
  return <ChatStore.Provider value={value}>{children}</ChatStore.Provider>;
};

export { ChatStore, ChatStoreProvider };
