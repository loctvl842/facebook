import './chatMenuRooms.css';
// components
import Room from './room/Room';

// hooks
import { useContext, useEffect, useState } from 'react';

// context
import { ChatStore } from '../../../context/ChatContext/store';

const ChatMenuRooms = () => {
  const {
    chat: { rooms, roomActiveElement },
  } = useContext(ChatStore);

  useEffect(() => {
    if (roomActiveElement) {
      roomActiveElement.classList.add('roomActive');
    }
  }, [roomActiveElement]);

  return (
    <div className="chatMenuRooms">
      {rooms.map((room) => (
        <Room key={room._id} room={room} />
      ))}
    </div>
  );
};

export default ChatMenuRooms;
