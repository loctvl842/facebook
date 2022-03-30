import './chatMenu.css';
// icon
import { SearchIcon, KeyboardBackspaceIcon } from '../../icon';

// context
import { Store } from '../../store/store';
import { useContext, useState, useEffect, useRef, memo } from 'react';

import axios from 'axios';

// components
import SearchChatUser from '../searchChatUser/SearchChatUser';

// hook
import useSearchUsers from '../../customHook/useSearchUsers';

const ChatMenu = ({ setSearchedUser }) => {
  const {
    auth: { user },
  } = useContext(Store);

  const [searchIconVisible, setSearchIconVisible] = useState(true);

  const { searchInput, setSearchInput, users } = useSearchUsers();
  const [searchVisible, setSearchVisible] = useState(false);
  const inputSearchRef = useRef();
  const searchTableRef = useRef();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`/conversation/${user._id}`);
        console.log(res.data);
        // TODO fetch conversation
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

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
                        setSearchedUser={setSearchedUser}
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
      <div className="chatMenuBottom"></div>
    </div>
  );
};

export default memo(ChatMenu);
