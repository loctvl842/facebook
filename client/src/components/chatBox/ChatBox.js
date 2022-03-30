import './chatBox.css';
import Message from '../message/Message';

import { useNavigate } from 'react-router-dom';
import { SearchedUserContext } from '../../pages/messenger/Messenger';
import { useContext } from 'react';

const ChatBox = ({ chatInfoState, setChatInfoState }) => {
  const navigate = useNavigate();
  const searchedUser = useContext(SearchedUserContext);

  return (
    <div className="chatBoxWrapper">
      {!searchedUser ? (
        <div className="chatBoxAltContainer">
          <div className="chatBoxAlt">
            Select a chat or start a new conversation
          </div>
        </div>
      ) : (
        <>
          <div className="chatBoxTop">
            <div className="chatBoxTopLeft">
              <div
                className="chatBoxImgContainer"
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate(`/profile/${searchedUser.username}`);
                }}
              >
                <img
                  src={searchedUser.profilePicture}
                  alt="loc"
                  className="chatBoxImg"
                />
              </div>
              <div className="chatBoxText">
                <span
                  className="chatBoxName"
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/profile/${searchedUser.username}`);
                  }}
                >
                  {searchedUser.username}
                </span>
                <span className="chatBoxState">Active now</span>
              </div>
            </div>
            <div className="chatBoxTopRight">
              <div className="chatBoxOptions">
                <div
                  className="chatBoxOption"
                  onClick={() => {
                    setChatInfoState(!chatInfoState);
                  }}
                >
                  <div className="chatBoxInfoIcon">i</div>
                </div>
              </div>
            </div>
          </div>
          <div className="chatBoxMessage">
            <Message />
            <Message />
            <Message />
            <Message />
            <Message />
          </div>
          <div className="chatBoxInput"></div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
