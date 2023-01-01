import { Avatar, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../APIs/axios";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const Chatbox = ({ chat, currentUserId }) => {
    const timeAgo = new TimeAgo('en-US')
  const [userData, setUserData] = useState(null);
  const [messages,setMessages] = useState([])

  //Fetching data for header
  const userId = chat?.members?.find((id) => id !== currentUserId);
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

  //Fetching data for messages
  const fetchMessages = async()=>{
    try{
        axios.get('/user/message/'+chat._id).then((response)=>{
            setMessages(response.data)
            console.log(response.data)
        }).catch(err=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
  }

  useEffect(()=>{
    if(chat!==null)fetchMessages()
  },[chat])

  useEffect(() => {
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  return (
    <>
      <div className="chatBox-container">
        <>
          <div className="chatHeader">
            <div className="follower">
              {/* <div className="online-dot"></div> */}
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
                {/* <Typography sx={{ fontSize: "10px" }}>Online</Typography> */}
              </Box>
            </div>
            <hr style={{width:'85%',border:'0.1px solid #ececec'}}/>
          </div>

          <div className="chat-body">
            {messages.map((message)=>(
                <>
                <div className={message.senderId === currentUserId?"message own":"message"}>
                    <Typography>{message.text}</Typography>
                    <Typography>{timeAgo.format(new Date( message.createdAt))}</Typography>
                </div>
                </>
            ))}
          </div>
          <div className='chat-sender'>
                <div>+</div>
          </div>
        </>
      </div>
    </>
  );
};

export default Chatbox;
