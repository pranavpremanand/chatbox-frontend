import { createSlice } from "@reduxjs/toolkit";

const initialState= { user: {} }

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    user: (state, action) => {
        // console.log('action.payload.user',action.payload.user)
      state.user = action.payload.user;
    },
    resetUser:()=>initialState,
    accessToken:(state,action)=>{
      state.user.accessToken = action.payload.accessToken
    }
    // addCoverPic:(state,action)=>{
    //   console.log('USERSDATA',state)
    //   state.user.coverPic = action.payload.user
    // }
  },
});

export const { user,resetUser,accessToken } = userSlice.actions;
export default userSlice.reducer;
