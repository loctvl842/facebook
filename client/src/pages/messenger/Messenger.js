import './messenger.css';
import ChatMenu from '../../components/chatMenu/ChatMenu';
import ChatBox from '../../components/chatBox/ChatBox';
import ChatInfo from '../../components/chatInfo/ChatInfo';
import { useEffect, useState, createContext } from 'react';

export const SearchedUserContext = createContext();

function Messenger() {
  const [chatInfoState, setChatInfoState] = useState(false);
  const [searchedUser, setSearchedUser] = useState(null);
  useEffect(() => {
    document.title = 'Messenger | Facebook';
  }, []);
  return (
    <SearchedUserContext.Provider value={searchedUser}>
      <div className="messenger">
        <div className="chatMenu">
          <ChatMenu setSearchedUser={setSearchedUser} />
        </div>
        <div className="chatBox">
          <ChatBox
            chatInfoState={chatInfoState}
            setChatInfoState={setChatInfoState}
            searchedUser={searchedUser}
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
