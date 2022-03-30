import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Messenger from './pages/messenger/Messenger';
import Friends from './pages/friends/Friends';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Context
import { Store } from './store/store';
import { useContext } from 'react';
import Topbar from './components/topbar/Topbar';

function App() {
  const {
    auth: { user },
  } = useContext(Store);
  return (
    <Router>
      {user && <Topbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/messenger" element={<Messenger />}></Route>
        <Route path="/friends" element={<Friends />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
