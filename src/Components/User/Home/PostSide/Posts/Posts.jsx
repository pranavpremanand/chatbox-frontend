import React, { useEffect, useState } from "react";
import "./Posts.css";
// import { PostData } from "../../../../../Data/PostData";
import Post from "./Post";
import axios from "../../../../../APIs/axios";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../../../../Redux/PostSlice";

const Posts = ({getPosts}) => {
  const postData = useSelector((state) => state.posts.posts);
  // const [postData,setPostData] = useState([])
  useEffect(() => {
  getPosts()
  }, []);

  return (
    <div className="posts">
      {postData[0]
        ? postData.map((post, id) => {
            return !post.posts.isDeleted && <Post getPosts = {getPosts} data={post} liked={post.isLiked} />;
          })
        : null}
    </div>
  );
};

export default Posts;
