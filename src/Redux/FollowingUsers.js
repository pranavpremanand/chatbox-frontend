import { createSlice } from "@reduxjs/toolkit";

const followingUsersSlice = createSlice({
  name: "followingUsers",
  initialState: { users:[] },
  reducers: {
    followingUsers: (state, action) => {
      state.users = action.payload.users;
    },
    followed:(state,action)=>{
        action.payload.users.isFollowed = true
        state.users.unshift(action.payload.users)
    },
    unfollowUser: (state, action) => {
      state.users = state.users.filter(
        (val) => val._id !== action.payload.users
      );
    },
  },
});

export const { followingUsers,unfollowUser,followed } = followingUsersSlice.actions;
export default followingUsersSlice.reducer;
