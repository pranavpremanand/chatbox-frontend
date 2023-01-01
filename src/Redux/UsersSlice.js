import { createSlice } from "@reduxjs/toolkit";
const initialState = {users:[]}
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    followers: (state, action) => {
      state.users = action.payload.users;
    },
    following:(state,action)=>{
        state.users = action.payload.users
    },
    others:(state,action)=>{
        state.users = action.payload.users
    },
    unfollowed:(state,action)=>{
      
        state.users = state.users.filter(val=>val._id!==action.payload.users)
    },
    followed:(state,action)=>{
        state.users = state.users.filter(val=>val._id!==action.payload.users)
    },
    resetUsers:()=>initialState
  },
});

export const {followers,following,others,followed,unfollowed,resetUsers } = usersSlice.actions;
export default usersSlice.reducer;
