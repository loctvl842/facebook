import "./topbarLeft.css";

import { useNavigate } from "react-router-dom";
import { useContext, memo } from "react";

// icon
import { Search } from "@mui/icons-material";

// context
import { FeedStore } from "../../../context/FeedContext/store";
import { SetPosts, PostStart } from "../../../context/FeedContext/actions";

import axios from "axios";

function TopbarLeft() {
  const navigate = useNavigate();
  const { dispatch } = useContext(FeedStore);

  const handleLogoClick = async () => {
    dispatch(PostStart());
    window.scrollTo(0, 0);
    navigate("/");
    const res = await axios.get("/posts/random/6");
    dispatch(
      SetPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      )
    );
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

export default memo(TopbarLeft);
