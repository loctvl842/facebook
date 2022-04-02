import './chatMenuRooms.css';
// components
import Room from './room/Room';

// hooks
import { useContext, useEffect } from 'react';

// context
import { ChatStore } from '../../../context/ChatContext/store';

const ChatMenuRooms = () => {
  const {
    chat: { rooms },
  } = useContext(ChatStore);

  useEffect(() => {
    const roomElements = document.querySelectorAll('.room');
    if (roomElements.length) {
      roomElements.forEach((element) => {
        element.classList.remove('roomActive');
      });
      roomElements[0].classList.add('roomActive');
    }
  }, []);

  return (
    <div className="chatMenuRooms">
      {rooms.map((room) => (
        <Room key={room._id} room={room} />
      ))}
    </div>
  );
};

export default ChatMenuRooms;
