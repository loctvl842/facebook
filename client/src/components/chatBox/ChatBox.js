import './chatBox.css';
import Message from '../message/Message';

import ChatBoxInput from '../chatBoxInput/ChatBoxInput';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// context
import { ChatStore } from '../../context/ChatContext/store';

const OneFriendChatBoxImg = ({ imgUrl, friendName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="oneFriendChatBoxImgContainer"
      onClick={() => {
        navigate(`/profile/${friendName}`);
        window.scrollTo(0, 0);
      }}
    >
      <img className="oneFriendChatBoxImg" src={imgUrl} alt="" />
    </div>
  );
};

const GroupChatBoxImg = ({ imgUrl1, imgUrl2 }) => {
  return (
    <div className="groupChatBoxImgContainer">
      <div className="groupChatBoxImgTopRight">
        <img className="groupChatBoxImg" src={imgUrl1} alt="" />
      </div>
      <div className="groupChatBoxImgBottomLeft">
        <img className="groupChatBoxImg" src={imgUrl2} alt="" />
      </div>
    </div>
  );
};

const ChatBox = ({ chatInfoState, setChatInfoState }) => {
  const navigate = useNavigate();
  const {
    chat: { roomActive },
  } = useContext(ChatStore);
  const handleChatBoxNameClick = () => {
    // one friend
    if (roomActive.members.length === 1) {
      navigate(`/profile/${roomActive.name}`);
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="chatBoxWrapper">
      {!roomActive ? (
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
                style={{ background: 'none' }}
              >
                {roomActive.members.length > 1 ? (
                  <GroupChatBoxImg
                    imgUrl1={roomActive.img[1]}
                    imgUrl2={roomActive.img[0]}
                  />
                ) : (
                  <OneFriendChatBoxImg
                    imgUrl={roomActive.img[0]}
                    friendName={roomActive.name}
                  />
                )}
              </div>
              <div className="chatBoxText">
                <span
                  className="chatBoxName"
                  onClick={handleChatBoxNameClick}
                  style={{
                    textDecoration: `${
                      roomActive.members.length === 1 ? '' : 'none'
                    }`,
                    cursor: `${
                      roomActive.members.length === 1 ? 'pointer' : 'text'
                    }`,
                  }}
                >
                  {roomActive.name}
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
