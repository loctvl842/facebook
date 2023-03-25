import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';

const Home = () => {
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
