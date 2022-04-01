import './chatBoxInput.css';
import {
  AddIcon,
  PermMediaRoundedIcon,
  ThumbUpIcon,
  SendIcon,
} from '../../icon';
import { useState } from 'react';

const ChatBoxInput = () => {
  const [chatInputText, setChatInputText] = useState('');

  return (
    <div className="chatBoxInputContainer">
      <div className="chatBoxInputBtn">
        <div className="moreAction">
          <AddIcon sx={{ fontSize: '20px', color: '#fff' }} />
        </div>
      </div>
      <label htmlFor="chatBoxInputFile" className="chatBoxInputBtn attachFile">
        <PermMediaRoundedIcon sx={{ fontSize: '24px', color: '#1878f3' }} />
        <input
          id="chatBoxInputFile"
          className="chatBoxInputFile"
          type="file"
          style={{ display: 'none' }}
        />
      </label>
      <label htmlFor="chatBoxInputText" className="chatBoxInputWrapper">
        <input
          className="chatBoxInputText"
          id="chatBoxInputText"
          type="text"
          placeholder="Aa"
          value={chatInputText}
          onChange={(e) => setChatInputText(e.target.value)}
        />
      </label>
      <div className="chatBoxInputBtn">
        {chatInputText ? (
          <div className="chatBoxInputBtnIcon">
            <SendIcon sx={{ fontSize: '25px', color: '#1878f3' }} />
          </div>
        ) : (
          <div className="chatBoxInputBtnIcon">
            <ThumbUpIcon sx={{ fontSize: '25px', color: '#1878f3' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBoxInput;
