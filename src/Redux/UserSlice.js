import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { user: {} },
  reducers: {
    user: (state, action) => {
        // console.log('action.payload.user',action.payload.user)
      state.user = action.payload.user;
    },
    nullUser:(state,action)=>{
      state.user = action.payload.user;
    }
    // addCoverPic:(state,action)=>{
    //   console.log('USERSDATA',state)
    //   state.user.coverPic = action.payload.user
    // }
  },
});

export const { user,nullUser } = userSlice.actions;
export default userSlice.reducer;
