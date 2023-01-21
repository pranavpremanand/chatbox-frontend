import { ImageList } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAPI from "../../../APIs/UserAPI";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import SavedPost from "../../../Components/User/SavedPost/SavedPost";
import { setSavedPosts } from "../../../Redux/SavedPostsSlice";
import "./SavedPosts.css";

const SavedPosts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const response = await userAPI.get("/user/posts");
      dispatch(setSavedPosts(response.data.savedPosts.savedPosts));
    } catch (err) {
      console.log(err);
    }
  };
  const savedPosts = useSelector((state) => state.savedPosts.savedPosts);
  console.log(savedPosts, "posts here");
  return (
    <div className="Main">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div className="savedPosts">
        <ImageList
          sx={{
            width: "100%",
            maxHeight: "95vh",
            overflow: "scroll",
            display: 'flex',
            flexWrap:'wrap',
            justifyContent:'flex-start'
          }}
        >
          {savedPosts.map((post) => {
            return <SavedPost post={post} />;
          })}
        </ImageList>
      </div>
      <div>
        <RightSide />
      </div>
    </div>
  );
};

export default SavedPosts;
