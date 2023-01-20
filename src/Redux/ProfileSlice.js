import { createSlice } from "@reduxjs/toolkit";

const profileViewSlice = createSlice({
  name: "profileView",
  initialState: { user: true, userId: null },
  reducers: {
    loggedUserStatus: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userId = action.payload;
    },
  },
});
export const { loggedUserStatus, setUserProfile } = profileViewSlice.actions;
export default profileViewSlice.reducer;
