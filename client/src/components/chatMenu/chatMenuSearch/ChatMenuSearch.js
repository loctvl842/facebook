import './chatMenuSearch.css';
import { useContext, useState, useEffect, useRef } from 'react';
// hook
import useSearchUsers from '../../../customHook/useSearchUsers';
// icon
import { SearchIcon, KeyboardBackspaceIcon } from '../../../icon';
import SearchChatUser from './searchChatUser/SearchChatUser';

const ChatMenuSearch = () => {
  const [searchIconVisible, setSearchIconVisible] = useState(true);
  const { searchInput, setSearchInput, users } = useSearchUsers();
  const [searchVisible, setSearchVisible] = useState(false);
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
        setSearchInput('');
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
  );
};

export default ChatMenuSearch;
