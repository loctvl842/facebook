import "./share.css";

import { useNavigate } from "react-router-dom";

import CreatePost from "../createPost/CreatePost";

// icons
import { VideoCall, PermMediaRounded, TagFacesOutlined } from "@mui/icons-material";
import { useClickOutside } from "../../customHook/useClickOutside";
import { useSelector } from "react-redux";

const Share = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
  const { visible, setVisible, ref: cardRef } = useClickOutside(false);
  return (
    <div className="share">
      <CreatePost visible={visible} setVisible={setVisible} cardRef={cardRef} />
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"}
            alt=""
            onClick={() => {
              window.scrollTo(0, 0);
              navigate(`/profile/${user.username}`);
            }}
          />
          <div className="shareInput" onClick={() => setVisible(true)}>
            What's on your mind, {user.username}?
          </div>
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <span className="shareOptionText">
                <VideoCall style={{ color: "#f00" }} className="shareIcon" />
                Live video
              </span>
            </div>
            <div
              className="shareOption"
              onClick={() => {
                setVisible(true);
              }}
            >
              <span className="shareOptionText">
                <PermMediaRounded style={{ color: "#00f050" }} className="shareIcon" />
                Photo/Video
              </span>
            </div>
            <div className="shareOption">
              <span className="shareOptionText">
                <TagFacesOutlined style={{ color: "#e6c002" }} className="shareIcon" />
                Feeling/Activity
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
