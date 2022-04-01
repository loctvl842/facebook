import './chatMenu.css';
// icon
import { SearchIcon, KeyboardBackspaceIcon } from '../../icon';

// context
import { AuthStore } from '../../context/AuthContext/store';
import { useContext, useState, useEffect, useRef, memo } from 'react';

// components
import SearchChatUser from '../searchChatUser/SearchChatUser';
import Room from '../room/Room';

// hook
import useSearchUsers from '../../customHook/useSearchUsers';

import axios from 'axios';

const ChatMenu = ({ setRoomChatBox }) => {
  const {
    auth: { user },
  } = useContext(AuthStore);

  const [searchIconVisible, setSearchIconVisible] = useState(true);

  const { searchInput, setSearchInput, users } = useSearchUsers();
  const [searchVisible, setSearchVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const inputSearchRef = useRef();
  const searchTableRef = useRef();

  const handleSearchFriendChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (inputSearchRef.current && inputSearchRef.current.contains(e.target)) {
      setSearchVisible(true);
    } else {
      if (
        searchTableRef.current &&
        !searchTableRef.current.contains(e.target)
      ) {
        setSearchVisible(false);
      }
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get(`/rooms?userId=${user._id}`);
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRooms();
  }, [user]);

  useEffect(() => {
    if (rooms.length != 0) {
      const roomElements = document.querySelectorAll('.room');
      roomElements.forEach((element) => element.classList.remove('roomActive'));
      roomElements[0].classList.add('roomActive');
    }
  }, [rooms]);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
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
      <div className="chatMenuSearch">
        {searchVisible && (
          <div className="chatMenuBackIcon">
            <KeyboardBackspaceIcon sx={{ fontSize: '25px', color: '#777' }} />
          </div>
        )}
        <label className="chatMenuSearchContainer" htmlFor="searchMessenger">
          {searchIconVisible && (
            <div className="chatMenuSearchIcon">
              <SearchIcon sx={{ fontSize: '23px', color: '#888' }} />
            </div>
          )}
          <input
            type="text"
            className="chatMenuSearchInput"
            placeholder="Search friends"
            id="searchMessenger"
            value={searchInput}
            ref={inputSearchRef}
            autoComplete="off"
            onChange={handleSearchFriendChange}
            onBlur={() => setSearchIconVisible(true)}
            onFocus={() => setSearchIconVisible(false)}
          />
        </label>
        {searchVisible && (
          <div className="chatMenuSearchedFriend" ref={searchTableRef}>
            <div className="chatMenuSearchedFriendWrapper">
              {searchInput && (
                <div className="chatMenuSearchFor">
                  <SearchIcon
                    sx={{
                      fontSize: '30px',
                      color: '#333',
                    }}
                  />
                  <div className="chatMenuSearchForText">
                    Search messages for "{searchInput}"
                  </div>
                </div>
              )}
              <div className="chatMenuSearchedFriendContainer">
                {searchInput && (
                  <>
                    {users.map((user) => (
                      <SearchChatUser
                        key={user._id}
                        chatUser={user}
                        setSearchVisible={setSearchVisible}
                        setSearchInput={setSearchInput}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="chatMenuBottom">
        {rooms.map((room) => (
          <Room key={room._id} room={room} setRoomChatBox={setRoomChatBox} />
        ))}
      </div>
    </div>
  );
};

export default memo(ChatMenu);
