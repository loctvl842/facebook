import "./topbarUser.css";

// hook
import { useClickOutside } from "~/customHook/useClickOutside";

// actions
import { authReset } from "~/store/authSlice";

// icon
import { ArrowDropDown, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function TopbarUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;

  // useState
  const { visible: dropdownVisible, ref: dropdownBtn, btnRef } = useClickOutside(false);

  const handleLogOut = () => {
    dispatch(authReset());
    navigate("/login");
  };

  return (
    <div className="accountContainer">
      <div className="accountBtnWrapper" ref={btnRef}>
        <ArrowDropDown
          sx={{
            fontSize: 32,
            color: "#000",
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
              <img src={user.profilePicture || PUBLIC_FOLDER + "defaultAvt.jpg"} alt="avatar" className="topbarImg" />
            </div>
            <div className="accountOptionRight">
              <h4>{user.username}</h4>
              <span>See your profile</span>
            </div>
          </div>
          <div className="accountHr"></div>
          <div className="accountOption" onClick={handleLogOut}>
            <div className="accountOptionLeft">
              <Logout sx={{ fontSize: "20px" }} />
            </div>
            <span className="accountOptionRight">Log out</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TopbarUser;
