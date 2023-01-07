import { createSlice } from "@reduxjs/toolkit";

const initialState= { notifications: [],seen:[] }
const NotificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
    seenNotifications:(state,action)=>{
        state.seen = action.payload.notifications;
    },
    resetNotifications:(state,action)=>{
        state.seen = initialState.seen;
    },
  },
});

export const { setNotifications,seenNotifications,resetNotifications } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
