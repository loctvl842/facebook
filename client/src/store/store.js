import { createContext, useReducer, useEffect, useMemo } from 'react';
import rootReducer from './reducer';

const INIT_STATE = {
    auth: {
        user: JSON.parse(localStorage.getItem('user')) || null,
        isFetching: false,
        error: false,
    },
    feed: {
        posts: [],
        isFetching: false,
        error: false,
    },
};

const Store = createContext(INIT_STATE);

const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, INIT_STATE);
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(state.auth.user));
    }, [state.auth]);
    const value = {
        auth: state.auth,
        feed: state.feed,
        dispatch,
    };
    return <Store.Provider value={value}>{children}</Store.Provider>;
};

export { Store, StoreProvider };
