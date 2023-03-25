import "./topbarLeft.css";

import { useNavigate } from "react-router-dom";

// icon
import { Search } from "@mui/icons-material";

function TopbarLeft() {
  const navigate = useNavigate();

  const handleLogoClick = async () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className="topbarLeft">
      <div className="logo" onClick={handleLogoClick}>
        <img src={"/logo/logo192.png"} alt="" className="logoImage" />
      </div>
      <div className="topbarSearch">
        <Search sx={{ fontSize: "20px", color: "#aaa" }} />
      </div>
    </div>
  );
}

export default TopbarLeft;
