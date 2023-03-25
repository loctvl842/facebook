import { createContext, useReducer } from 'react';
import rootReducer from './reducer';

const INIT_STATE = {
  posts: [],
  isFetching: false,
  error: false,
};

const FeedStore = createContext(INIT_STATE);

const FeedStoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, INIT_STATE);
  const value = {
    feed: state,
    dispatch,
  };
  return <FeedStore.Provider value={value}>{children}</FeedStore.Provider>;
};

export { FeedStore, FeedStoreProvider };
