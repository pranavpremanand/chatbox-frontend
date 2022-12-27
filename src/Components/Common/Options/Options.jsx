import { Box, Button, Container, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate,useHref } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import Person2Icon from "@mui/icons-material/Person2";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import EmailIcon from "@mui/icons-material/Email";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { nullUser, user } from "../../../Redux/UserSlice";
import { useDispatch } from "react-redux";
import BookmarksIcon from '@mui/icons-material/Bookmarks';

const Options = () => {
  const dispatch = useDispatch()
  const logOut = ()=>{
    localStorage.removeItem("userToken")
    dispatch(user({user:null}))
    navigate("/login");
  }

  const navigate = useNavigate();
  return (
    <Container>
      <Box className="buttonsBox">
        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button onClick={()=>navigate('/')}
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <HomeIcon/>
            Home
          </Button>
        </Grid>

        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize" onClick={()=>navigate('/profile')}
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

        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <EmailIcon />
            Messaging
          </Button>
        </Grid>

        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <BookmarksIcon />
            Saved Posts
          </Button>
        </Grid>

        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            sx={{ fontSize: "medium", color: "black",gap:'0.5rem' }}
            className="text-capitalize"
          >
          <NotificationsIcon />
            Notifications
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

        <Grid sx={{paddingBottom:'0.5rem'}}>
          <Button
            className="text-capitalize"
            sx={{ fontSize: "medium", color:'black',gap:'0.5rem' }}
            onClick={() => {logOut()
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