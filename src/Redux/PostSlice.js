import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {
    allPosts: (state, action) => {
      // console.log(action.payload.posts, " action.payload.posts");
      state.posts = action.payload.posts;
    },
    postUpload: (state, action) => {
      // console.log(action.payload, "payload");
      if (state.posts.indexOf(action.payload.posts._id) === -1) {
        state.posts.unshift(action.payload.posts);
      }
    },
    postDelete: (state, action) => {
      state.posts = state.posts.filter(
        (val) => val._id !== action.payload.posts
      );
    },
    // likePost: (state, action) => {
    //   const post = state.posts.find((val) => val._id === action.payload);
    //   post.isLiked = true;
    //   post.likedUsers.push(1);
    // },
    // unlikePost: (state, action) => {
    //   const post = state.posts.find((val) => val._id === action.payload);
    //   console.log("POST IS HERE", state.posts);
    //   post.likedUsers = post.likedUsers.filter((val) => val !== 1);
    //   post.isLiked = false;
    // },
    postsNull: (state, action) => {
      state.posts = [];
    },
  },
});

export const {
  allPosts,
  likePost,
  unlikePost,
  postUpload,
  postDelete,
  postsNull,
} = postSlice.actions;
export default postSlice.reducer;
