// pages
// import { Home, Profile, Login, Register, Friends } from "~/pages";
import { Login, Home, Profile } from "~/pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Topbar from "./components/topbar/Topbar";

function App() {
  const user = localStorage.getItem("user");

  return (
    <BrowserRouter>
      {user && <Topbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route path="/login" element={user ? <Home /> : <Login />}></Route>
        {/* <Route path="/register" element={<Register />}></Route> */}
        {/* <Route path="/friends" element={<Friends />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
