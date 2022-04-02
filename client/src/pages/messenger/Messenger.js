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
import { SetRooms } from '../../context/ChatContext/actions';

function Messenger() {
  const {
    auth: { user },
  } = useContext(AuthStore);
  const { dispatch: chatDispatch } = useContext(ChatStore);
  // mounting/unmounting chatInfo
  const [chatInfoState, setChatInfoState] = useState(false);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`/rooms?userId=${user._id}`);
        chatDispatch(SetRooms(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
    document.title = 'Messenger | Facebook';
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
