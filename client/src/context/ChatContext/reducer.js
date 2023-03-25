const INIT_STATE = {
  rooms: [],
  roomActive: null,
  roomActiveElement: null,
  isFetching: false,
  error: false,
};

const rootReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'chat/CHAT_START':
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case 'chat/SET_ROOMS':
      return {
        ...state,
        rooms: [...action.payload],
        isFetching: false,
        error: false,
      };
    case 'chat/MOVE_TO_FRONT':
      const newRooms = [...state.rooms];
      newRooms.unshift(
        newRooms.splice(
          newRooms.findIndex((item) => item._id === action.payload),
          1,
        )[0],
      );
      return {
        ...state,
        rooms: newRooms,
        isFetching: false,
        error: false,
      };
    case 'chat/SET_ROOM_ACTIVE':
      return {
        ...state,
        roomActive: action.payload.room,
        roomActiveElement: action.payload.roomElement,
      };
    case 'chat/CHAT_LOGOUT':
      return {
        ...state,
        rooms: [],
        roomActive: null,
      };
    default:
      return state;
  }
};

export default rootReducer;
