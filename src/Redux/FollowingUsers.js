import { createSlice } from "@reduxjs/toolkit";

const initialState = { users: [] };
const followingUsersSlice = createSlice({
  name: "followingUsers",
  initialState,
  reducers: {
    followingUsers: (state, action) => {
      state.users = action.payload.users;
    },
    followed: (state, action) => {
      action.payload.users.isFollowed = true;
      state.users.unshift(action.payload.users);
    },
    unfollowUser: (state, action) => {
      state.users = state.users.filter(
        (val) => val._id !== action.payload.users
      );
    },
    resetFollowingUsers: () => initialState,
  },
});

export const { followingUsers, unfollowUser, followed,resetFollowingUsers } =
  followingUsersSlice.actions;
export default followingUsersSlice.reducer;
