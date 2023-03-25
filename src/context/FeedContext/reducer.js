const INIT_STATE = {
  posts: [],
  isFetching: false,
  error: false,
};

const rootReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'feed/POST_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'feed/SET_POSTS':
      return {
        ...state,
        posts: [...action.payload],
        isFetching: false,
        error: false,
      };
    case 'feed/ADD_POST':
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        isFetching: false,
        error: false,
      };
    case 'feed/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id != action.payload._id),
        isFetching: false,
        error: false,
      };
    case 'feed/UPDATE_POST':
      const index = state.posts.findIndex(
        (post) => post._id == action.payload._id,
      );
      const newPosts = [...state.posts];
      newPosts[index].desc = action.payload.desc;
      if (action.payload.img != undefined) {
        newPosts[index].img = action.payload.img;
      }
      return {
        ...state,
        posts: newPosts,
        isFetching: false,
        error: false,
      };
    case 'feed/POST_FAILURE':
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
