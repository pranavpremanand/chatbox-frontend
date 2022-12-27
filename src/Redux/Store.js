import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice";
import Users from "./UsersSlice";
import User from "./UserSlice";
import Comments from "./CommentsSlice";
import Photos from "./UserPhotosSlice";

const store = configureStore({
  reducer: {
    posts: PostSlice,
    users: Users,
    user: User,
    comments: Comments,
    photos: Photos,
    // otherUsers: OtherUsers,
    // followingUsers: FollowingUsers,
    // followers:Followers
  },
});

export default store;
