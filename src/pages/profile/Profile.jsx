// style
import "./profile.css";

// components
import RightBar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import CreateAvt from "../../components/createAvt/CreateAvt";
import Loading from "../../components/loading/Loading";
import CoverPhoto from "../../components/coverPhoto/CoverPhoto";

// hook
import { useClickOutside } from "../../customHook/useClickOutside";


// icons
import { CameraAlt } from "@mui/icons-material";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Profile = () => {
  const { isFetching } = useSelector((state) => state.auth);
  const user = useSelector(state => state.user)

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  // can be you or another person's page
  const [account, setAccount] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState("");

  // true when the user page is belong to the current user
  const [editableInfo, setEditableInfo] = useState(false);
  // get the name of the profilePage-user
  const username = useParams().username;

  // for checking if click outside createAvt card
  const { visible: createAvtVisibe, setVisible: setCreateAvtVisible, ref: createAvtRef } = useClickOutside();

  // have to set edit ability to the current user only
  // (we can edit the other people'pages)
  useEffect(() => {
    document.title = `${username} | Facebook`;
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`);
        setAccount(res.data);
        // we can edit info of currentUser
        setEditableInfo(user._id === res.data._id);
        setCoverPhoto(res.data.coverPicture);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [username, user]);

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
                {!isFetching && account !== null ? (
                  account.coverPicture ? (
                    <img className="profileCoverImg" src={account.coverPicture} alt="" />
                  ) : (
                    <label
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      htmlFor="coverPhoto"
                    ></label>
                  )
                ) : (
                  <Loading />
                )}
                <CoverPhoto coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto} editableInfo={editableInfo} />
              </div>
            </div>
            <div className="profileInfoContainer">
              <div className="profileInfoWrapper">
                <div className="profileInfoLeft"></div>
                <div className="profileInfoRight">
                  <h2 className="profileInfoName">{account !== null ? account.username : "loc"}</h2>
                  <span className="profileFriendCounter">362 Friends</span>
                </div>
              </div>
            </div>
            <div className="profileInfoUserImgContainer">
              <div className="profileInfoUserImgLeft">
                <img
                  className="profileUserImg"
                  src={account !== null ? account.profilePicture : PUBLIC_FOLDER + "defaultAvt.jpg"}
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
                      <CameraAlt />
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
            <RightBar user={account} />
            <Feed username={account ? account.username : 'loc'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
