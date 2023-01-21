import React, { useEffect, useState } from "react";
import "./Posts.css";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = ({ getPosts }) => {
  const postData = useSelector((state) => state.posts.posts);
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="posts">
      {postData[0]
        ? postData.map((post, id) => {
            return (
              !post.posts.isDeleted && (
                <Post
                  getPosts={getPosts}
                  data={post}
                />
              )
            );
          })
        : null}
    </div>
  );
};

export default Posts;
