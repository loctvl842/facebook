import './searchChatUser.css';

function SearchChatUser({
  chatUser,
  setSearchedUser,
  setSearchVisible,
  setSearchInput,
}) {
  const handleSearchedUserClick = () => {
    setSearchedUser(chatUser);
    setSearchVisible(false);
    setSearchInput('');
  };

  return (
    <div className="searchChatUser" onClick={handleSearchedUserClick}>
      <div className="searchChatUserWrapper">
        <div className="searchChatUserImgContainer">
          <img
            className="searchChatUserImg"
            src={chatUser.profilePicture}
            alt=""
          />
        </div>
        <div className="searchChatUserText">
          {chatUser && chatUser.username}
        </div>
      </div>
    </div>
  );
}

export default SearchChatUser;
