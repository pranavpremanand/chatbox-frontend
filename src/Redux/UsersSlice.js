import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: { 
    users:[]
   },
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
    nullUsers:(state,action)=>{
      state.users = null
    }
  },
});

export const {followers,following,others,followed,unfollowed,nullUsers } = usersSlice.actions;
export default usersSlice.reducer;
