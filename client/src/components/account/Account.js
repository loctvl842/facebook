import './account.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useClickOutside } from '../../customHook/useClickOutside';

// context
import { AuthStore } from '../../context/AuthContext/store';
import { LogOut } from '../../context/AuthContext/actions';

// icon
import { ArrowDropDownIcon, LogoutIcon } from '../../icon';

function Account() {
  const navigate = useNavigate();
  const {
    auth: { user },
    dispatch,
  } = useContext(AuthStore);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // useState
  const {
    visible: dropdownVisible,
    ref: dropdownBtn,
    btnRef,
  } = useClickOutside(false);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    dispatch(LogOut());
    navigate('/login');
  };
  return (
    <div className="accountContainer">
      <div className="accountBtnWrapper" ref={btnRef}>
        <ArrowDropDownIcon
          sx={{
            fontSize: 32,
            color: '#000',
          }}
        />
      </div>
      {dropdownVisible && (
        <div className="accountOptions" ref={dropdownBtn}>
          <div
            className="accountOption"
            onClick={() => {
              navigate(`/profile/${user.username}`);
              window.scrollTo(0, 0);
            }}
          >
            <div className="accountOptionLeft accountAvatar">
              <img
                src={user.profilePicture || PUBLIC_FOLDER + 'defaultAvt.jpg'}
                alt="avatar"
                className="topbarImg"
              />
            </div>
            <div className="accountOptionRight">
              <h4>{user.username}</h4>
              <span>See your profile</span>
            </div>
          </div>
          <div className="accountHr"></div>
          <div className="accountOption" onClick={handleLogOut}>
            <div className="accountOptionLeft">
              <LogoutIcon sx={{ fontSize: '20px' }} />
            </div>
            <span className="accountOptionRight">Log out</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
