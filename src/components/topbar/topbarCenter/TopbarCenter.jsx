import "./topbarCenter.css";
// icons
import { Home, Chat, People } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

function TopbarCenter({ pathname }) {
  const navigate = useNavigate();
  const handleHomePageClick = async () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  const handleMessengerPageClick = async () => {
    navigate("/messenger");
  };

  const handleFriendsPageClick = () => {
    window.scrollTo(0, 0);
    navigate("/friends");
  };

  return (
    <div className="topbarCenter">
      <div className="topbarCenterWrapper">
        <div
          onClick={handleHomePageClick}
          className={`topbarCenterPageContainer ${
            pathname === "/" && "topbarCenterPageActive"
          }`}
        >
          <div className="topbarCenterPage">
            <Home
              sx={{
                color: pathname === "/" ? "#1877f2" : "#aaa",
                fontSize: "28px",
              }}
            />
          </div>
        </div>
        <div
          onClick={handleMessengerPageClick}
          className={`topbarCenterPageContainer ${
            pathname.includes("/messenger") && "topbarCenterPageActive"
          }`}
        >
          <div className="topbarCenterPage">
            <Chat
              sx={{
                color: pathname.includes("/messenger") ? "#1877f2" : "#aaa",
                fontSize: "28px",
              }}
            />
          </div>
        </div>
        <div
          onClick={handleFriendsPageClick}
          className={`topbarCenterPageContainer ${
            pathname === "/friends" && "topbarCenterPageActive"
          }`}
        >
          <div className="topbarCenterPage">
            <People
              sx={{
                color: pathname === "/friends" ? "#1877f2" : "#aaa",
                fontSize: "28px",
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
