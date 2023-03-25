import './messenger.css';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import ChatBox from '../../components/chatBox/ChatBox';
import ChatInfo from '../../components/chatInfo/ChatInfo';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// context
import { AuthStore } from '../../context/AuthContext/store';
import { ChatStore } from '../../context/ChatContext/store';

// actions of [ChatStore]
import { SetRoomActive, SetRooms } from '../../context/ChatContext/actions';
import { useNavigate } from 'react-router-dom';

function Messenger() {
  const navigate = useNavigate();
  const {
    auth: { user },
  } = useContext(AuthStore);
  const {
    chat: { roomActive, roomActiveElement },
    dispatch: chatDispatch,
  } = useContext(ChatStore);
  // mounting/unmounting chatInfo
  const [chatInfoState, setChatInfoState] = useState(false);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`/rooms?userId=${user._id}`);
        chatDispatch(SetRooms(res.data));
        if (roomActive === null) {
          chatDispatch(
            SetRoomActive({
              room: res.data[0],
              roomElement: document.querySelector('.room'),
            }),
          );
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
    document.title = 'Messenger | Facebook';
  }, [user]);

  // TODO fix room active element and object
  useEffect(() => {
    // console.log(roomActiveElement);
    // if (roomActiveElement) {
    //   roomActiveElement.classList.add('roomActive');
    // }
    if (roomActive) {
      console.log(roomActive);
    } else {
      console.log('Loc null');
    }
  }, [roomActive]);

  useEffect(() => {
    const navigateMessenger = async () => {
      window.scrollTo(0, 0);
      try {
        const res = await axios.get(`/rooms?userId=${user._id}`);
        if (res.data.length) {
          chatDispatch(SetRooms(res.data));
          chatDispatch(SetRoomActive(res.data[0]));
          const firstRoom = res.data[0];
          const firstRoomUrl =
            firstRoom.members.length > 1
              ? firstRoom._id
              : firstRoom.members[0]._id;
          navigate(`/messenger/${firstRoomUrl}`);
        }
      } catch (err) {
        console.log(err);
      }
    };
    navigateMessenger();
  }, []);
  return (
    <div className="messenger">
      <div className="chatMenu">
        <ChatMenu />
      </div>
      <div className="chatBox">
        <ChatBox
          chatInfoState={chatInfoState}
          setChatInfoState={setChatInfoState}
        />
      </div>
      {chatInfoState && (
        <div className="chatInfo">
          <ChatInfo />
        </div>
      )}
    </div>
  );
}

export default Messenger;
