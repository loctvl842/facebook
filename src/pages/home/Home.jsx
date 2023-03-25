import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import RightBar from "../../components/rightbar/Rightbar";
import Feed from "../../components/feed/Feed";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === null) {
      navigate("/login");
      return
    }
    document.title = 'Facebook'
  }, [navigate]);
  return (
    <div>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <RightBar profile="home" />
      </div>
    </div>
  );
};

export default Home;
