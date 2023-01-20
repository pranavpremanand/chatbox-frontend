import { Box, Button, Container, Grid } from "@mui/material";
import React, {  } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import EmailIcon from "@mui/icons-material/Email";
import { resetUser } from "../../../Redux/UserSlice";
import { resetComments } from "../../../Redux/CommentsSlice";
import { resetFollowingUsers } from "../../../Redux/FollowingUsers";
import { resetOthers } from "../../../Redux/OtherUsers";
import { resetPosts } from "../../../Redux/PostSlice";
import { resetUsers } from "../../../Redux/UsersSlice";
import { useDispatch, useSelector } from "react-redux";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { loggedUser, loggedUserStatus } from "../../../Redux/ProfileSlice";

const Options = () => {
  // const profileViewUser = useSelector((state)=>state.profileViewUser.user)
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'))
  const notifications = user?.unseenNotifications.filter((val)=>val.userId!==user._id)
  const logOut = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    dispatch(resetUser());
    dispatch(resetComments());
    dispatch(resetPosts());
    dispatch(resetOthers());
    dispatch(resetUsers());
    dispatch(resetFollowingUsers());
    navigate("/login");
  };

  const handleClickNotifications = async () => {
    navigate("/notifications");
  };

  const navigate = useNavigate();
  return (
    <Container>
      <Box className="buttonsBox">
        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button
            onClick={() => navigate("/")}
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            className="text-capitalize"
          >
            <HomeIcon />
            Home
          </Button>
        </Grid>

        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            className="text-capitalize"
            onClick={() =>{ dispatch(loggedUserStatus(true)); navigate("/profile")}}
          >
            <Person2Icon />
            Profile
          </Button>
        </Grid>

        {/* <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button onClick={()=>navigate('/find-people')}
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <PeopleAltIcon />
            Find people
          </Button>
        </Grid> */}

        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            className="text-capitalize"
            onClick={() => navigate("/messaging")}
          >
            <EmailIcon />
            Messaging
          </Button>
        </Grid>
        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button onClick={()=>navigate('/saved-posts')}
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            className="text-capitalize"
          >
            <BookmarksIcon />
            Saved Posts
          </Button>
        </Grid>

        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button
            onClick={handleClickNotifications}
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            className="text-capitalize"
          >
            <NotificationsIcon />
            Notifications
            <Box
              sx={{
                backgroundColor: "lightblue",
                borderRadius: "50%",
                paddingX: "0.5rem",
              }}
            >
              {notifications.length !== 0 && notifications.length}
            </Box>
          </Button>
        </Grid>

        {/* <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <SettingsIcon />
            Settings
          </Button>
        </Grid> */}

        <Grid sx={{ paddingBottom: "0.5rem" }}>
          <Button
            className="text-capitalize"
            sx={{ fontSize: "medium", color: "black", gap: "0.5rem" }}
            onClick={() => {
              logOut();
            }}
          >
            <LogoutIcon />
            Logout
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Options;
