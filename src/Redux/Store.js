import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice";
import Users from "./UsersSlice";
import User from "./UserSlice";
import Comments from "./CommentsSlice";
import Photos from "./UserPhotosSlice";
import Notifications from "./NotificationsSlice";

const store = configureStore({
  reducer: {
    posts: PostSlice,
    users: Users,
    user: User,
    comments: Comments,
    photos: Photos,
    notifications:Notifications
  },
});

export default store;
