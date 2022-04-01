import './room.css';

// context
import { AuthStore } from '../../context/AuthContext/store';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Room = ({ room, setRoomChatBox }) => {
  const {
    auth: { user: currentUser },
  } = useContext(AuthStore);
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);
  const [isGroup, setIsGroup] = useState(null);

  const [roomImg, setRoomImg] = useState('');
  const [roomName, setRoomName] = useState('');
  const currentRoom = useRef();

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const source = axios.CancelToken.source();
    setIsGroup(room.name != undefined);
    if (!room.name) {
      const friendId = room.members.find((id) => id != currentUser._id);
      if (friendId) {
        const fetchFriend = async () => {
          try {
            const res = await axios.get(`/users?userId=${friendId}`, {
              cancelToken: source.token,
            });
            setFriend(res.data);
            setRoomName(res.data.username);
            setRoomImg(res.data.profilePicture);
          } catch (err) {
            if (axios.isCancel(err)) {
              console.log('axios cleanup in Room.js');
            } else {
              console.log(err);
            }
          }
        };
        fetchFriend();
      }
    } else {
      setRoomName(room.name);
      setRoomImg(room.img ? room.img : `${PUBLIC_FOLDER}/defaultAvt.jpg `);
    }
    return () => {
      source.cancel();
    };
  }, [room]);

  const handleRoomClick = () => {
    const rooms = document.querySelectorAll('.room');
    rooms.forEach((room) => room.classList.remove('roomActive'));
    currentRoom.current.classList.add('roomActive');
    navigate(`/messenger/${friend._id}`);
    setRoomChatBox(room);
  };

  useEffect(() => {
    if (friend) navigate(`/messenger/${friend._id}`);
  }, []);

  return (
    <div
      className="room roomActive"
      ref={currentRoom}
      onClick={handleRoomClick}
    >
      <div className="roomContainer">
        <div className="roomLeft">
          <div className="roomLeftImgContainer">
            <img className="roomLeftImg" src={roomImg} alt="" />
          </div>
          <div className="roomLeftText">
            <div className="roomLeftName">{roomName}</div>
            <div className="roomLeftLastMessage">
              {room.lastMessage.content}
            </div>
          </div>
        </div>
        <div className="roomRight"></div>
      </div>
    </div>
  );
};

export default Room;
