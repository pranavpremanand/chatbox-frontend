import { Avatar, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "../../../APIs/UserAuthAPI";
import Badge from "@mui/material/Badge";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Conversation = ({ online, data, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);
  //   const userId = data.members.find((id) => id !== currentUserId);
  const userId = data._id;
  // console.log(userId,'USERID')
  const getUserData = async () => {
    try {
      axios
        .get("/user/get-user/" + userId)
        .then((response) => {
          setUserData(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="follower conversation">
        <div>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={userData?.fullName} src={userData?.profilePic} />
            </StyledBadge>
          ) : (
            <Avatar alt={userData?.fullName} src={userData?.profilePic} />
          )}
          {/* {online && <div className="online-dot"></div>} */}
          {/* {userData?.profilePic ? (
          // <img style={{}} src={userData.profilePic} alt="" />:
          <div
            style={{
              backgroundImage: `url(${userData.profilePic})`,
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "50%",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        ) : (
          <Avatar />
        )} */}
          <Box
            sx={{
              fontSize: "0.8rem",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ fontWeight: "bold", fontSize: "13px" }}>
              {userData?.fullName}
            </Typography>
            {/* <Typography sx={{fontSize:'13px'}}>{userData?.username}</Typography> */}
            <Typography sx={{ fontSize: "10px" }}>
              {online ? "Online" : "Offline"}
            </Typography>
          </Box>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
