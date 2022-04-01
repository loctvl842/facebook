import './chatBox.css';
import Message from '../message/Message';

import { useNavigate } from 'react-router-dom';
import { SearchedUserContext } from '../../pages/messenger/Messenger';
import { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import ChatBoxInput from '../chatBoxInput/ChatBoxInput';

const ChatBox = ({ chatInfoState, setChatInfoState, roomChatBox }) => {
  console.log(roomChatBox);
  const navigate = useNavigate();
  // friend to chat is searched user
  const searchedUser = useContext(SearchedUserContext);
  const [messags, setMessages] = useState([]);
  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchMessages = async () => {
      try {
        // TODO get the room
        // and then
        // TODO get all the messages in the room
        // const res = await axios.get(
        //   `/api/messages?roomId=${roomChatBox?.roomChatBox._id}`,
        // );
        // console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, [searchedUser]);

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
          <div className="chatBoxInput">
            <ChatBoxInput />
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
