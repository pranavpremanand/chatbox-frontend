import { createSlice } from "@reduxjs/toolkit";
const initialState= { comments: [] }
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    allComments: (state, action) => {
      state.comments = action.payload.comments;
    },
    resetComments: () => initialState
  },
});

export const { allComments,resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
