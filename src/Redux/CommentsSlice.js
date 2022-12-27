import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: { comments: [] },
  reducers: {
    allComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    nullComments: (state, action) => {
      state.comments = null;
    },
  },
});

export const { allComments,nullComments } = commentsSlice.actions;
export default commentsSlice.reducer;
