import { createSlice } from "@reduxjs/toolkit";

const OtherUsersSlice = createSlice({
  name: "otherUsersSlice",
  initialState: { users:[] },
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
  },
});

export const { followUser,otherUsers,unfollowed } = OtherUsersSlice.actions;
export default OtherUsersSlice.reducer;
