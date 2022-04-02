import './searchChatUser.css';
import { useNavigate } from 'react-router-dom';

function SearchChatUser({ chatUser, setSearchVisible, setSearchInput }) {
  const navigate = useNavigate();
  const handleSearchedUserClick = () => {
    navigate(`/messenger/${chatUser._id}`);
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
