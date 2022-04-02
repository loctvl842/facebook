// style
import './profile.css';

// components
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import CreateAvt from '../../components/createAvt/CreateAvt';
import Loading from '../../components/loading/Loading';
import CoverPhoto from '../../components/coverPhoto/CoverPhoto';

// hook
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

// icons
import { CameraAltIcon } from '../../icon';
// context
import { AuthStore } from '../../context/AuthContext/store';

import { useClickOutside } from '../../customHook/useClickOutside';

const Profile = () => {
  const {
    auth: { user: currentUser },
    isFetching,
  } = useContext(AuthStore);
  useEffect(() => {
    currentUser.alo = 'loc';
    console.log('Profile ', currentUser);
  }, []);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // can be you or another person's page
  const [user, setUser] = useState({});
  const [coverPhoto, setCoverPhoto] = useState('');

  // true when the user page is belong to the current user
  const [editableInfo, setEditableInfo] = useState(false);
  // get the name of the profilePage-user
  const username = useParams().username;

  // for checking if click outside createAvt card
  const {
    visible: createAvtVisibe,
    setVisible: setCreateAvtVisible,
    ref: createAvtRef,
  } = useClickOutside();

  // have to set edit ability to the current user only
  // (we can edit the other people'pages)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setUser(res.data);
        // we can edit info of currentUser
        setEditableInfo(currentUser._id === res.data._id);
        setCoverPhoto(res.data.coverPicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
    document.title = `${username} | Facebook`;
  }, [username]);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);
  return (
    <div className="profileContainer">
      <CreateAvt
        createAvtVisibe={createAvtVisibe}
        setCreateAvtVisible={setCreateAvtVisible}
        createAvtRef={createAvtRef}
      />
      {isFetching && <Loading />}
      <div className="profile">
        <div className="profileTop">
          <div className="profileTopContainer">
            <div className="profileCoverImgContainer">
              <div className="profileCoverImgWrapper">
                {!isFetching ? (
                  user.coverPicture ? (
                    <img
                      className="profileCoverImg"
                      src={user.coverPicture}
                      alt=""
                    />
                  ) : (
                    <label
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      htmlFor="coverPhoto"
                    ></label>
                  )
                ) : (
                  <Loading />
                )}
                <CoverPhoto
                  coverPhoto={coverPhoto}
                  setCoverPhoto={setCoverPhoto}
                  editableInfo={editableInfo}
                />
              </div>
            </div>
            <div className="profileInfoContainer">
              <div className="profileInfoWrapper">
                <div className="profileInfoLeft"></div>
                <div className="profileInfoRight">
                  <h2 className="profileInfoName">{user.username}</h2>
                  <span className="profileFriendCounter">362 Friends</span>
                </div>
              </div>
            </div>
            <div className="profileInfoUserImgContainer">
              <div className="profileInfoUserImgLeft">
                <img
                  className="profileUserImg"
                  src={user.profilePicture || PUBLIC_FOLDER + 'defaultAvt.jpg'}
                  alt="avatar"
                />
                {editableInfo && (
                  <>
                    <div
                      className="profileChooseAvt"
                      onClick={() => {
                        setCreateAvtVisible(true);
                      }}
                    >
                      <CameraAltIcon />
                    </div>
                  </>
                )}
              </div>
              <div className="profileInfoUserImgRight"></div>
            </div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="profileBottomContainer">
            <RightBar user={user} />
            <Feed username={user.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
