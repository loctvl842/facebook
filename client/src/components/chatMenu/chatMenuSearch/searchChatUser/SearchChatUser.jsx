import './searchChatUser.css';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

// context
import { ChatStore } from '../../../../context/ChatContext/store';
import { SetRoomActive } from '../../../../context/ChatContext/actions';

const OneFriendRoomImg = ({ imgUrl }) => {
  return (
    <div className="oneSearchChatImgContainer">
      <img className="oneSearchChatImg" src={imgUrl} alt="" />
    </div>
  );
};

const GroupRoomImg = ({ imgUrl1, imgUrl2 }) => {
  return (
    <div className="searchChatImgContainer">
      <div className="searchChatImgTopRight">
        <img className="searchChatImg" src={imgUrl1} alt="" />
      </div>
      <div className="searchChatImgBottomLeft">
        <img className="searchChatImg" src={imgUrl2} alt="" />
      </div>
    </div>
  );
};

function SearchChatUser({ room, setSearchVisible, setSearchInput }) {
  const navigate = useNavigate();
  const { dispatch } = useContext(ChatStore);
  const handleSearchedUserClick = () => {
    setSearchVisible(false);
    setSearchInput('');
    // navigate to chatbox connect with chatroom
    const roomUrl = room.members.length > 1 ? room._id : room.members[0].userId;
    navigate(`/messenger/${roomUrl}`);
    // change roomActive
    dispatch(SetRoomActive(room));
  };

  return (
    <div className="searchChatUser" onClick={handleSearchedUserClick}>
      <div className="searchChatUserWrapper">
        <div className="searchChatUserImgContainer">
          {room.members.length === 1 ? (
            <OneFriendRoomImg imgUrl={room.img[0]} />
          ) : (
            <GroupRoomImg imgUrl1={room.img[1]} imgUrl2={room.img[0]} />
          )}
        </div>
        <div className="searchChatUserText">{room.name}</div>
      </div>
    </div>
  );
}

export default SearchChatUser;
