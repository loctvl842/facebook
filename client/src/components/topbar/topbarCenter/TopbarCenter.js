import './topbarCenter.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useContext, memo } from 'react';
// context
import { FeedStore } from '../../../context/FeedContext/store';
import { AuthStore } from '../../../context/AuthContext/store';

// actions of [PostStore]
import { SetPosts, PostStart } from '../../../context/FeedContext/actions';
// actions of [ChatStore]
import { SetRooms } from '../../../context/ChatContext/actions';

// icon
import { HomeIcon, ChatIcon, PeopleIcon } from '../../../icon';

function TopbarCenter({ pathname }) {
  const navigate = useNavigate();
  // dispatch of [FeedStore]
  const { dispatch: feedDispatch } = useContext(FeedStore);
  const {
    auth: { user },
    dispatch: chatDispatch,
  } = useContext(AuthStore);
  const handleHomePageClick = async () => {
    feedDispatch(PostStart());
    window.scrollTo(0, 0);
    navigate('/');
    const res = await axios.get('/posts/random/6');
    feedDispatch(
      SetPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }),
      ),
    );
  };

  const handleMessengerPageClick = async () => {
    window.scrollTo(0, 0);
    try {
      const res = await axios.get(`/rooms?userId=${user._id}`);
      chatDispatch(SetRooms(res.data));
      const firstRoom = res.data[0];
      const firstRoomUrl =
        firstRoom.members.length > 1 ? firstRoom._id : firstRoom.members[0]._id;
      navigate(`/messenger/${firstRoomUrl}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFriendsPageClick = () => {
    window.scrollTo(0, 0);
    navigate('/friends');
  };

  return (
    <div className="topbarCenter">
      <div className="topbarCenterWrapper">
        <div
          onClick={handleHomePageClick}
          className={`topbarCenterPageContainer ${
            pathname === '/' && 'topbarCenterPageActive'
          }`}
        >
          <div className="topbarCenterPage">
            <HomeIcon
              sx={{
                color: pathname === '/' ? '#1877f2' : '#aaa',
                fontSize: '28px',
              }}
            />
          </div>
        </div>
        <div
          onClick={handleMessengerPageClick}
          className={`topbarCenterPageContainer ${
            pathname.includes('/messenger') && 'topbarCenterPageActive'
          }`}
        >
          <div className="topbarCenterPage">
            <ChatIcon
              sx={{
                color: pathname.includes('/messenger') ? '#1877f2' : '#aaa',
                fontSize: '28px',
              }}
            />
          </div>
        </div>
        <div
          onClick={handleFriendsPageClick}
          className={`topbarCenterPageContainer ${
            pathname === '/friends' && 'topbarCenterPageActive'
          }`}
        >
          <div className="topbarCenterPage">
            <PeopleIcon
              sx={{
                color: pathname === '/friends' ? '#1877f2' : '#aaa',
                fontSize: '28px',
              }}
              fontSize="medium"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopbarCenter;
