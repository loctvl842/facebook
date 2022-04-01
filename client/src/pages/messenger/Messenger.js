import './messenger.css';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import ChatBox from '../../components/chatBox/ChatBox';
import ChatInfo from '../../components/chatInfo/ChatInfo';
import { useEffect, useState, createContext } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

export const SearchedUserContext = createContext();

function Messenger() {
  const [chatInfoState, setChatInfoState] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  // state of the current room we are chatting
  const [roomChatBox, setRoomChatBox] = useState(null);
  const userId = useParams().userid;
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/users?userId=${userId}`);
          setSearchedUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUser();
    } else {
      setSearchedUser(null);
    }
  }, [userId]);
  useEffect(() => {
    document.title = 'Messenger | Facebook';
  }, []);
  useEffect(() => {
    console.log(roomChatBox);
  }, [roomChatBox]);
  return (
    <SearchedUserContext.Provider value={searchedUser}>
      <div className="messenger">
        <div className="chatMenu">
          <ChatMenu setRoomChatBox={setRoomChatBox} />
        </div>
        <div className="chatBox">
          <ChatBox
            chatInfoState={chatInfoState}
            setChatInfoState={setChatInfoState}
            roomChatBox={roomChatBox}
          />
        </div>
        {chatInfoState && (
          <div className="chatInfo">
            <ChatInfo />
          </div>
        )}
      </div>
    </SearchedUserContext.Provider>
  );
}

export default Messenger;
