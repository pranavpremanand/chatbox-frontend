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
    }
  },
});

export const { setNotifications,seenNotifications } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
