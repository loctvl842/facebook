import './home.css';
import Sidebar from '../../components/sidebar/Sidebar';
import RightBar from '../../components/rightbar/Rightbar';
import Feed from '../../components/feed/Feed';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/');
    document.title = 'Facebook';
  }, []);
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
