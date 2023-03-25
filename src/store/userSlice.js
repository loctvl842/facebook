import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(_, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    userEdit(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
    },
    userReset() {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { userSet, userEdit } = userSlice.actions;
