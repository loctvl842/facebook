// pages
// import { Home, Profile, Login, Register, Friends } from "~/pages";
import { Login, Home, Profile } from "~/pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";
import { useSelector } from "react-redux";

function App() {
  const { loggedIn } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {loggedIn && <Topbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/register" element={<Register />}></Route> */}
        {/* <Route path="/friends" element={<Friends />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
