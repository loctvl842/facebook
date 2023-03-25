import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isFetching: false,
  error: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postStart(state) {
      state.isFetching = true;
    },
    postSet(state, action) {
      state.posts = action.payload;
    },
    postAdd(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    postUpdate(state, action) {
      const { id, value } = action.payload;
      console.log(value);
      let targetPost = null;
      const filterdPosts = state.posts.filter((p) => {
        if (p._id === id) {
          targetPost = { ...p, ...value };
        }
        return p._id !== id;
      });
      state.posts = [targetPost, ...filterdPosts];
    },
    postRemove(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter((p) => p._id !== postId);
    },
    postSuccess(state) {
      state.isFetching = false;
      state.error = false;
    },
    postFail(state, action) {
      state.error = action.payload;
      state.isFetching = false;
    },
  },
});

export default postSlice.reducer;
export const { postStart, postSet, postAdd, postRemove, postUpdate, postSuccess, postFail } = postSlice.actions;
