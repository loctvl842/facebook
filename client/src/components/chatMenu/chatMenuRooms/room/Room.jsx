import { useContext, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './room.css';

// context
import { ChatStore } from '../../../../context/ChatContext/store';
import { SetRoomActive } from '../../../../context/ChatContext/actions';

const OneFriendRoomImg = ({ imgUrl }) => {
  return (
    <div className="oneFriendRoomImgContainer">
      <img className="oneFriendRoomImg" src={imgUrl} alt="" />
    </div>
  );
};

const GroupRoomImg = ({ imgUrl1, imgUrl2 }) => {
  return (
    <div className="groupRoomImgContainer">
      <div className="groupRoomImgTopRight">
        <img className="groupRoomImg" src={imgUrl1} alt="" />
      </div>
      <div className="groupRoomImgBottomLeft">
        <img className="groupRoomImg" src={imgUrl2} alt="" />
      </div>
    </div>
  );
};

const Room = ({ room }) => {
  const roomRef = useRef();
  const {
    chat: { roomActiveElement },
    dispatch,
  } = useContext(ChatStore);
  const navigate = useNavigate();
  const renderRoomName = useMemo(() => {
    if (room.name.length > 25) {
      // friend user
      if (room.members.length === 1) {
        return room.name.substring(0, 18) + '...';
      }
      // group
      else {
        return (
          room.members[0].username + ' and ' + room.members.length + ' others'
        );
      }
    } else {
      return room.name;
    }
  }, [room.name]);

  const handleRoomClick = () => {
    // ui/ux
    if (roomActiveElement) {
      roomActiveElement.classList.remove('roomActive');
    }
    // navigate to chatbox connect with chatroom
    const roomUrl = room.members.length > 1 ? room._id : room.members[0]._id;
    navigate(`/messenger/${roomUrl}`);
    // change roomActive
    dispatch(SetRoomActive({ room, roomElement: roomRef.current }));
  };

  return (
    <div className="room" ref={roomRef} onClick={handleRoomClick}>
      <div className="roomContainer">
        <div className="roomLeft">
          <div className="roomLeftImgContainer">
            {room.members.length === 1 ? (
              <OneFriendRoomImg imgUrl={room.img[0]} />
            ) : (
              <GroupRoomImg imgUrl1={room.img[1]} imgUrl2={room.img[0]} />
            )}
          </div>
          <div className="roomLeftText">
            <div className="roomLeftName">{renderRoomName}</div>
            <div className="roomLeftLastMessage">loc</div>
          </div>
        </div>
        <div className="roomRight"></div>
      </div>
    </div>
  );
};

export default Room;
