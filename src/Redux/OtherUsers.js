import { createSlice } from "@reduxjs/toolkit";

const initialState= { users:[] }
const OtherUsersSlice = createSlice({
  name: "otherUsersSlice",
  initialState,
  reducers: {
    otherUsers: (state, action) => {
      state.users = action.payload.users;
    },
    followUser: (state, action) => {
      state.users = state.users.filter(
        (val) => val._id !== action.payload.users
      );
    },
    unfollowed: (state, action) => {
     state.users.unshift(action.payload.users)
    },
    resetOthers:()=>initialState
  },
});

export const { followUser,otherUsers,unfollowed,resetOthers } = OtherUsersSlice.actions;
export default OtherUsersSlice.reducer;
