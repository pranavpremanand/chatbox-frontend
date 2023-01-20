import { createSlice } from "@reduxjs/toolkit";

const initialState= { user: {},changePassword:false }

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
    },
    changePassword:(state,action)=>{
      state.changePassword = action.payload
    }
    // addCoverPic:(state,action)=>{
    //   console.log('USERSDATA',state)
    //   state.user.coverPic = action.payload.user
    // }
  },
});

export const { user,resetUser,accessToken,changePassword } = userSlice.actions;
export default userSlice.reducer;
