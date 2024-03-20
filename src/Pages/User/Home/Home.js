import React, { useEffect, useState } from "react";
import axios from "../../../APIs/UserAuthAPI";
// import axios from 'axios'
import "./Home.css";
import {
  Box,
  Button,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import PostSide from "../../../Components/User/Home/PostSide/PostSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import { createTheme } from "@mui/material/styles";
import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { allPosts } from "../../../Redux/PostSlice";
import { changePassword, user } from "../../../Redux/UserSlice";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
// import useMediaQuery from '@mui/material/useMediaQuery';
import * as Yup from "yup";
import {
  useFormik,
  // Formik
} from "formik";
import userAPI from "../../../APIs/UserAuthAPI";
import { toast } from "react-hot-toast";
import { setSavedPosts } from "../../../Redux/SavedPostsSlice";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#ffff",
  width: 300,
  // minWidth:100,
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required("This field is required")
    .min(6, "Minimum 6 characters are required")
    .max(16, "Maximum 16 characters are permitted"),

  confirmPassword: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("newPassword"), null], "Password must be same as above"),
});

function Home() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  // const navigate = useNavigate();
  const changeOldPassword = useSelector((state) => state.user.changePassword);
  const currentUser = useSelector((state) => state.user.user);
  const [changePasswordModal, setChangePasswordModal] =
    useState(changeOldPassword);
  useEffect(() => {
    getPosts();
  }, []);
  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      const response = await axios.get("/user/posts");
      dispatch(
        allPosts({
          posts: response.data.posts,
        })
      );
      dispatch(setSavedPosts(response.data.savedPosts.savedPosts));
      dispatch(user({ user: response.data.user }));
    } catch (err) {
      console.log(err);
    }
  };

  //Login
  const passwordChange = useFormik({
    initialValues,
    onSubmit: async (values) => {
      values.email = currentUser.email;
      try {
        const { data } = await userAPI.post("/user/change-password", values);
        dispatch(user({ user: data }));
        setChangePasswordModal(false);
        dispatch(changePassword(false));
        toast("Your password has been updated", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (err) {
        toast("Something went wrong. Try again.", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    },
    validationSchema,
  });

  return (
    // <ThemeProvider theme={theme}>
    <div className="Home">
      <div className="LeftSide">
        <LeftSide />
      </div>
      <div className="postSide">
        <PostSide getPosts={getPosts} />
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
      <Modal aria-labelledby="" aria-describedby="" open={changePasswordModal}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
            }}
          >
            <Typography sx={{ fontWeight: "500" }} id="">
              Change password
            </Typography>
            <CancelPresentationIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setChangePasswordModal(false);
                dispatch(changePassword(false));
                toast("Password didn't updated", {
                  // icon: "✅",
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                  },
                });
              }}
            />
          </Box>
          <Box component="form" onSubmit={passwordChange.handleSubmit}>
            <TextField
              name="newPassword"
              fullWidth
              type="password"
              id="newPassword"
              label="Enter new password"
              autoFocus
              sx={{ marginTop: 1 }}
              onChange={passwordChange.handleChange}
              value={passwordChange.values.newPassword}
            />
            {passwordChange.touched.newPassword &&
            passwordChange.errors.newPassword ? (
              <FormHelperText sx={{ color: "red" }}>
                {passwordChange.errors.newPassword}
              </FormHelperText>
            ) : null}
            <TextField
              name="confirmPassword"
              fullWidth
              type="password"
              id="confirmPassword"
              label="Confirm password"
              autoFocus
              sx={{ marginTop: 1 }}
              onChange={passwordChange.handleChange}
              value={passwordChange.values.confirmPassword}
            />
            {passwordChange.touched.confirmPassword &&
            passwordChange.errors.confirmPassword ? (
              <FormHelperText sx={{ color: "red" }}>
                {passwordChange.errors.confirmPassword}
              </FormHelperText>
            ) : null}
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2, mb: 2 }}
              fullWidth
              className="text-capitalize"
            >
              Change password
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>

    // {/* </ThemeProvider> */}
  );
}

export default Home;
