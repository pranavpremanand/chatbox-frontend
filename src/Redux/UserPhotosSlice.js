import { createSlice } from "@reduxjs/toolkit";

const userPhotos = createSlice({
  name: "userPhotos",
  initialState: { photos: [] },
  reducers: {
    photos: (state, action) => {
      state.photos = action.payload.photos;
    },
  },
});

export const { photos } = userPhotos.actions;
export default userPhotos.reducer;
