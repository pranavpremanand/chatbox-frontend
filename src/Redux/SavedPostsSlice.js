import { createSlice } from "@reduxjs/toolkit";

const initialState = { savedPosts:[]};

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    setSavedPosts: (state, action) => {
      state.savedPosts = action.payload;
    },
    resetSavedPosts: () => initialState,
  },
});

export const { resetSavedPosts, setSavedPosts } = savedPostsSlice.actions;
export default savedPostsSlice.reducer;