import "./login.css";

import { useNavigate } from "react-router-dom";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import { CircularProgress } from "@mui/material";

// actions
import { authStart, authSuccess, authFail } from "~/store/authSlice";
import { userSet } from "~/store/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const [creds, setCreds] = useState({
    email: "",
    password: "",
  });

  const handleFormControlChange = (e) => {
    const field = e.target.name;
    console.log(field);
    setCreds((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(authStart());
    try {
      const res = await axios.post("/auth/login", creds);
      dispatch(authSuccess(res.data));
      dispatch(userSet(res.data));
      navigate('/')
    } catch (e) {
      dispatch(authFail(e.response.data.content));
      if (e.response.data.type === "email") {
        emailRef.current.classList.add("loginInputError");
      } else if (e.response.data.type === "password") {
        passwordRef.current.classList.add("loginInputError");
      }
    }
  };

  useEffect(() => {
    passwordRef.current.setAttribute("type", showPassword ? "text" : "password");
  }, [showPassword]);

  useEffect(() => {
    navigate("/login");
    document.title = "Facebook - Login";
  }, [navigate]);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">Connect with friends and the world around you on Facebook</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
            {auth.error && (
              <div className="loginBoxErrorWrapper">
                <span className="loginBoxErrorContent">{auth.error}</span>
              </div>
            )}
            <div className="loginInputContainer">
              <input
                placeholder="Email address"
                className="loginInput"
                ref={emailRef}
                name="email"
                type="email"
                value={creds.email}
                onChange={handleFormControlChange}
                onFocus={(e) => e.target.classList.remove("loginInputError")}
                required
              />
            </div>
            <div className="loginInputContainer">
              <input
                placeholder="Password"
                className="loginInput"
                ref={passwordRef}
                name="password"
                type="password"
                value={creds.password}
                onChange={handleFormControlChange}
                onFocus={(e) => e.target.classList.remove("loginInputError")}
                required
                // minLength={8}
              />
              {creds.passowrd != "" && (
                <div
                  className="loginInputEyeWrapper"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <VisibilityOutlined className="loginInputEye" sx={{ fontSize: "14px" }} />
                  ) : (
                    <VisibilityOffOutlined className="loginInputEye" sx={{ fontSize: "14px" }} />
                  )}
                </div>
              )}
            </div>
            <button className="loginButton" disabled={auth.isFetching}>
              {auth.isFetching ? <CircularProgress style={{ color: "#fff" }} size="25px" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgotten password?</span>
            <hr />
            <div
              className="loginRegisterButton"
              disabled={auth.isFetching}
              onClick={() => {
                navigate("/register");
              }}
            >
              {auth.isFetching ? <CircularProgress style={{ color: "#fff" }} size="25px" /> : "Create New Account"}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
