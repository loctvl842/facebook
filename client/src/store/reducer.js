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

const rootReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'auth/LOGIN_START':
            return {
                ...state,
                auth: {
                    user: null,
                    isFetching: true,
                    error: false,
                },
            };
        case 'auth/LOGIN_SUCCESS':
            return {
                ...state,
                auth: {
                    user: action.payload,
                    isFetching: false,
                    error: false,
                },
            };
        case 'auth/LOGIN_FAILURE':
            return {
                ...state,
                auth: {
                    user: null,
                    isFetching: false,
                    error: action.payload,
                },
            };
        case 'auth/LOG_OUT':
            return {
                ...state,
                auth: {
                    user: null,
                    isFetching: false,
                    error: false,
                },
            };
        case 'auth/UPDATE_USER_START':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isFetching: true,
                    error: false,
                },
            };
        case 'auth/CHANGE_AVT_SUCCESS':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isFetching: false,
                    error: false,
                    user: {
                        ...state.auth.user,
                        profilePicture: action.payload,
                    },
                },
            };
        case 'auth/CHANGE_AVT_FAILURE':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isFetching: false,
                    error: action.payload,
                },
            };
        case 'auth/CHANGE_COVER_PHOTO_SUCCESS':
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: { ...state.auth.user, coverPicture: action.payload },
                    isFetching: false,
                    error: false,
                },
            };
        case 'feed/POST_START':
            return {
                ...state,
                feed: {
                    ...state.feed,
                    isFetching: true,
                    error: false,
                },
            };
        case 'feed/SET_POSTS':
            return {
                ...state,
                feed: {
                    ...state.feed,
                    posts: [...action.payload],
                    isFetching: false,
                    error: false,
                },
            };
        case 'feed/ADD_POST':
            return {
                ...state,
                feed: {
                    ...state.feed,
                    posts: [action.payload, ...state.feed.posts],
                    isFetching: false,
                    error: false,
                },
            };
        case 'feed/DELETE_POST':
            return {
                ...state,
                feed: {
                    ...state.feed,
                    posts: state.feed.posts.filter(
                        (post) => post._id != action.payload._id
                    ),
                    isFetching: false,
                    error: false,
                },
            };
        case 'feed/UPDATE_POST':
            const index = state.feed.posts.findIndex(
                (post) => post._id == action.payload._id
            );
            console.log('index ', index);
            const newPosts = [...state.feed.posts];
            newPosts[index].desc = action.payload.desc;
            if (action.payload.img != undefined) {
                console.log(action.payload.img);
                newPosts[index].img = action.payload.img;
            }
            return {
                ...state,
                feed: {
                    ...state.feed,
                    posts: newPosts,
                    isFetching: false,
                    error: false,
                },
            };
        case 'feed/POST_FAILURE':
            return {
                ...state,
                feed: {
                    ...state.feed,
                    isFetching: false,
                    error: action.payload,
                },
            };

        default:
            return state;
    }
};

export default rootReducer;
