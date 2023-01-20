import { createSlice } from "@reduxjs/toolkit";

const initialState = { posts: [],reportedPosts:[] };
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    allPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    postUpload: (state, action) => {
      if (state.posts.indexOf(action.payload.posts._id) === -1) {
        state.posts.unshift(action.payload.posts);
      }
    },
    postDelete: (state, action) => {
      state.posts = state.posts.filter(
        (val) => val._id !== action.payload.posts
      );
    },
    likePost: (state, action) => {
      const post = state.posts.find((val) => val._id === action.payload.postId);
      post.isLiked = true;
      post.likedUsers.push(action.payload.userId);
    },
    unlikePost: (state, action) => {
      const post = state.posts.find((val) => val._id === action.payload.postId);
      post.isLiked = false;
      post.likedUsers.pull(action.payload.userId);
    },
    reportPosts:(state,action)=>{
      state.reportedPosts = action.payload
    },
    resetPosts: () => initialState,
  },
});

export const {
  allPosts,
  likePost,
  unlikePost,
  postUpload,
  postDelete,
  resetPosts,
  reportPosts
} = postSlice.actions;
export default postSlice.reducer;
