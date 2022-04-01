import './rightbar.css';
import Online from '../online/Online';
import { Users } from '../../dummyData';
import { SchoolIcon, HomeIcon, EditLocationAltRoundedIcon } from '../../icon';

const Rightbar = ({ user }) => {
  const HomeRightBar = () => {
    return (
      <>
        <div className="homeRightbarContainer">
          <h4 className="rightbarTitle">Contacts</h4>
          <ul className="rightbarFriendList">
            {Users.map((user) => (
              <Online key={user.id} user={user} />
            ))}
          </ul>
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        <div className="profileRightBarContainer">
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarDesc">{user.desc}</div>
          <hr className="rightbarProfileHr" />
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <SchoolIcon className="rightbarInfoIcon" />
              <span className="rightbarInfoKey">
                Went to{' '}
                <span className="rightbarInfoValue">
                  Trường THPT Chuyên Hùng Vương - Gia Lai
                </span>
              </span>
            </div>
            <div className="rightbarInfoItem">
              <HomeIcon className="rightbarInfoIcon" />
              <span className="rightbarInfoKey">
                Lives in <span className="rightbarInfoValue">{user.city}</span>
              </span>
            </div>
            <div className="rightbarInfoItem">
              <EditLocationAltRoundedIcon className="rightbarInfoIcon" />
              <span className="rightbarInfoKey">
                From <span className="rightbarInfoValue">{user.from}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="profileRightBarContainer">
          <h4 className="rightbarTitle">Friends</h4>
          <div className="rightbarFollowingContainer">
            <div className="rightbarFollowing">
              <img
                src="http://localhost:3000/assets/van.jpg"
                alt=""
                className="rightbarFollowingImg"
              />
              <span className="rightbarFollowingName">Vân Nguyễn</span>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar /> : <HomeRightBar />}
      </div>
    </div>
  );
};

export default Rightbar;
