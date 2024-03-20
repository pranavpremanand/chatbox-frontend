import React from "react";
import Posts from "./Posts/Posts";
import PostShare from "./PostShare/PostShare";
import "./PostSide.css";

const PostSide = ({ getPosts }) => {
  return (
    <div className="postSide" style={{ background: "" }}>
      <PostShare getPosts={getPosts} />
      <Posts getPosts={getPosts} />
    </div>
  );
};

export default PostSide;
