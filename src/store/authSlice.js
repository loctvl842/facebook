import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  isFetching: false,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart() {
      return {
        loggedIn: false,
        isFetching: true,
        error: false,
      };
    },
    authSuccess(_, action) {
      const data = action.payload;
      return {
        loggedIn: true,
        isFetching: false,
        error: false,
      };
    },
    authFail(_, action) {
      return {
        loggedIn: false,
        isFetching: false,
        error: action.payload,
      };
    },
    authReset() {
      localStorage.removeItem("user");
      return {
        loggedIn: false,
        isFetching: false,
        error: false,
      };
    },
  },
});

export default authSlice.reducer;
export const { authStart, authSuccess, authFail, authReset } = authSlice.actions;
