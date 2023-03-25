import "./login.css";
import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";

import { CircularProgress } from "@mui/material";

// Context
import { AuthStore } from "../../context/AuthContext/store";

// actions of [AuthStore]
import {
  LoginStart,
  LoginSuccess,
  LoginFailure,
} from "../../context/AuthContext/actions";
import axios from "axios";

const Login = () => {
  const { auth, dispatch: authDispatch } = useContext(AuthStore);

  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const userCrediential = {
      email: email,
      password: password,
    };
    authDispatch(LoginStart());
    try {
      const loginRes = await axios.post("/auth/login", userCrediential);
      authDispatch(LoginSuccess(loginRes.data));
    } catch (err) {
      console.log(err.response);
      authDispatch(LoginFailure(err.response.data.content));
      if (err.response.data.type === "email") {
        emailRef.current.classList.add("loginInputError");
      } else if (err.response.data.type === "password") {
        passwordRef.current.classList.add("loginInputError");
      }
    }
  };

  useEffect(() => {
    passwordRef.current.setAttribute(
      "type",
      showPassword ? "text" : "password"
    );
  }, [showPassword]);

  useEffect(() => {
    navigate("/login");
    document.title = "Facebook - Login";
  }, []);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook
          </span>
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
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={(e) => e.target.classList.remove("loginInputError")}
                required
              />
            </div>
            <div className="loginInputContainer">
              <input
                placeholder="Password"
                className="loginInput"
                ref={passwordRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={(e) => e.target.classList.remove("loginInputError")}
                required
                // minLength={8}
              />
              {password != "" && (
                <div
                  className="loginInputEyeWrapper"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <VisibilityOutlined
                      className="loginInputEye"
                      sx={{ fontSize: "14px" }}
                    />
                  ) : (
                    <VisibilityOffOutlined
                      className="loginInputEye"
                      sx={{ fontSize: "14px" }}
                    />
                  )}
                </div>
              )}
            </div>
            <button className="loginButton" disabled={auth.isFetching}>
              {auth.isFetching ? (
                <CircularProgress style={{ color: "#fff" }} size="25px" />
              ) : (
                "Log In"
              )}
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
              {auth.isFetching ? (
                <CircularProgress style={{ color: "#fff" }} size="25px" />
              ) : (
                "Create New Account"
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
