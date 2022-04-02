export const ChatStart = () => {
  console.log('CHAT_START');
  return {
    type: 'chat/CHAT_START',
    payload: null,
  };
};

export const SetRooms = (rooms) => {
  console.log('SET_ROOMS');
  return {
    type: 'chat/SET_ROOMS',
    payload: rooms,
  };
};

export const MoveToFront = (roomId) => {
  console.log('MOVE_TO_FRONT');
  return {
    type: 'chat/MOVE_TO_FRONT',
    payload: roomId,
  };
};

export const SetRoomActive = (room) => {
  console.log('SET_ROOM_ACTIVE');
  return {
    type: 'chat/SET_ROOM_ACTIVE',
    payload: room,
  };
};
