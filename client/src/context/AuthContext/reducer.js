const INIT_STATE = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isFetching: false,
  error: false,
};

const rootReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'auth/LOGIN_START':
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case 'auth/LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case 'auth/LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case 'auth/LOG_OUT':
      return {
        ...state,
        user: null,
        isFetching: false,
        error: false,
      };
    case 'auth/UPDATE_USER_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'auth/CHANGE_AVT_SUCCESS':
      return {
        ...state,
        isFetching: false,
        error: false,
        user: {
          ...state.user,
          profilePicture: action.payload,
        },
      };
    case 'auth/CHANGE_AVT_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case 'auth/CHANGE_COVER_PHOTO_SUCCESS':
      return {
        ...state,
        user: { ...state.user, coverPicture: action.payload },
        isFetching: false,
        error: false,
      };
    default:
      return state;
  }
};

export default rootReducer;
