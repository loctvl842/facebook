import "./chatMenuSearch.css";
import { useState, useEffect, useRef, useContext } from "react";
// hook
import useSearchUsers from "../../../customHook/useSearchUsers";
// icon
import { Search, KeyboardBackspace } from "@mui/icons-material";
import SearchChatUser from "./searchChatUser/SearchChatUser";

// context
import { AuthStore } from "../../../context/AuthContext/store";

const ChatMenuSearch = () => {
  const {
    auth: { user },
  } = useContext(AuthStore);
  const [searchIconVisible, setSearchIconVisible] = useState(true);
  const {
    searchInput,
    setSearchInput,
    users: rooms,
    moreUsers: moreRooms,
  } = useSearchUsers({
    flag: "search-chat-user",
    userId: user._id,
  });

  const [searchVisible, setSearchVisible] = useState(false);
  const inputSearchRef = useRef();
  const searchTableRef = useRef();

  const handleSearchFriendChange = (e) => {
    setSearchInput(e.target.value);
    setSearchVisible(true);
  };

  const handleClickOutside = (e) => {
    // if click inside
    if (inputSearchRef.current && inputSearchRef.current.contains(e.target)) {
      setSearchVisible(true);
    } else {
      if (
        searchTableRef.current &&
        !searchTableRef.current.contains(e.target)
      ) {
        setSearchVisible(false);
        setSearchInput("");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return (
    <div className="chatMenuSearch">
      {searchVisible && (
        <div className="chatMenuBackIcon">
          <KeyboardBackspace sx={{ fontSize: "25px", color: "#777" }} />
        </div>
      )}
      <label className="chatMenuSearchContainer" htmlFor="searchMessenger">
        {searchIconVisible && (
          <div className="chatMenuSearchIcon">
            <Search sx={{ fontSize: "23px", color: "#888" }} />
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
                <Search
                  sx={{
                    fontSize: "30px",
                    color: "#333",
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
                  {rooms.map((room) => {
                    return (
                      <SearchChatUser
                        key={room._id}
                        room={room}
                        setSearchVisible={setSearchVisible}
                        setSearchInput={setSearchInput}
                      />
                    );
                  })}
                </>
              )}
              {searchInput && moreRooms.length !== 0 && (
                <>
                  <h4>More People</h4>
                  {moreRooms.map((room) => {
                    return (
                      <SearchChatUser
                        key={room.members[0]._id}
                        room={room}
                        setSearchVisible={setSearchVisible}
                        setSearchInput={setSearchInput}
                      />
                    );
                  })}
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
