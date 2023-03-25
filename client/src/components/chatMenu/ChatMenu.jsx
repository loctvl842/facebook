import './chatMenu.css';

// context
import { AuthStore } from '../../context/AuthContext/store';
import { useContext, memo } from 'react';

// components
import ChatMenuSearch from './chatMenuSearch/ChatMenuSearch';
import ChatMenuRooms from './chatMenuRooms/ChatMenuRooms';

const ChatMenu = () => {
  const {
    auth: { user },
  } = useContext(AuthStore);

  return (
    <div className="chatMenuWrapper">
      <div className="chatMenuTop">
        <div className="chatMenuTopContainer">
          <div className="chatMenuImgContainer">
            <img className="chatMenuImg" src={user.profilePicture} alt="" />
          </div>
          <div className="chatMenuTitle">chat</div>
        </div>
      </div>
      <ChatMenuSearch />
      <div className="chatMenuBottom">
        <ChatMenuRooms />
      </div>
    </div>
  );
};

export default memo(ChatMenu);
