import React, { useEffect, useState } from "react";
import axios from "../../../APIs/axios";
import "./Home.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import PostSide from "../../../Components/User/Home/PostSide/PostSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import { createTheme } from "@mui/material/styles";
import {createSlice} from '@reduxjs/toolkit'
import { useDispatch } from "react-redux";
import { allPosts } from "../../../Redux/PostSlice";
// import useMediaQuery from '@mui/material/useMediaQuery';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
function Home() {



  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const navigate = useNavigate();
  useEffect(() => {
    // console.log('Mounting')
    getData();
    // return console.log('Unmounting')
  }, []);
  const dispatch = useDispatch();

  const getPosts = async () => {
  try{
    await axios.get("/user/posts").then((response) => {
        const data = response.data.posts;
        dispatch(
          allPosts({
            posts: data,
          })
        );
      });
  }catch(err){
    console.log(err);
  }
};

  // const theme = React.useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: prefersDarkMode ? 'dark' : 'light',
  //       },
  //     }),
  //   [prefersDarkMode],
  // );
  const [posts,setPosts]=useState([])
  const getData = async () => {
    try {
        axios.get('/user/posts').then((response)=>{
          const data = response.data.posts
          setPosts({data})
        })
    } catch (err) {
      console.log(err);
    }
  };
  return (
    // <ThemeProvider theme={theme}>
    <div className="Home">
      <div className="LeftSide">
        <LeftSide />
      </div>
      <div className="postSide">
        <PostSide getPosts={getPosts}/>
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
    </div>

    // {/* </ThemeProvider> */}
  );
}

export default Home;
// module.exports = userSlic
