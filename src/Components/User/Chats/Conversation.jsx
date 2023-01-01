import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "../../../APIs/axios";
const Conversation = ({ data, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);
  const userId = data.members.find((id) => id !== currentUserId);
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
        <div className="online-dot"></div>
        {userData?.profilePic ? (
          // <img style={{}} src={userData.profilePic} alt="" />:
          <div
            style={{
              backgroundImage: `url(${userData.profilePic})`,
              width: "3rem",
              height: "3rem",
              borderRadius: "50%",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        ) : (
          <Avatar />
        )}
        <Box sx={{fontSize:'0.8rem',display:'flex',justifyContent:'center',flexDirection:'column'}}>
            <Typography sx={{fontWeight:'bold',fontSize:'13px'}}>{userData?.fullName}</Typography>
            {/* <Typography sx={{fontSize:'13px'}}>{userData?.username}</Typography> */}
            <Typography sx={{fontSize:'10px'}}>Online</Typography>
        </Box>
      </div>
    </div>
    <hr style={{width:'85%',border:'0.1px solid #ececec'}}/>
    </>
  );
};

export default Conversation;
