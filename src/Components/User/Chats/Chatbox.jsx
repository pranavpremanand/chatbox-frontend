import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import axios from "../../../APIs/axios";
import TimeAgo from "javascript-time-ago";
import InputEmoji from "react-input-emoji";
import en from "javascript-time-ago/locale/en";
import { Send } from "@mui/icons-material";

// TimeAgo.addDefaultLocale(en);
const Chatbox = ({ receiveMessage, setSendMessage, chat, currentUserId }) => {
  const timeAgo = new TimeAgo("en-US");
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  //   const scroll = useRef()

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage?.chatId === chat?._id) {
      console.log("receiveMessagereceiveMessage", receiveMessage);
      setMessages([receiveMessage, ...messages]);
    }
    console.log("receiveMessagereceiveMessage", receiveMessage);
  }, [receiveMessage]);

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
  const fetchMessages = async () => {
    try {
      axios
        .get("/user/message/" + chat._id)
        .then((response) => {
          setMessages(response.data);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: chat._id,
    };
    console.log("message", message);

    //send message to database
    try {
      await axios.post("/user/message", message).then((response) => {
        setMessages([response.data, ...messages]);
        setNewMessage("");
      });
    } catch (err) {
      console.log(err);
    }

    // Send message to socket server
    const receiverId = chat.members.find((id) => id !== currentUserId);
    const createdAt = Date.now();
    setSendMessage({ ...message, receiverId, createdAt });
  };

  //   useEffect(()=>{
  //     scroll.current.scrollIntoView({behaviour:'smooth'})
  //   },[messages])

  return (
    <>
      <div
        className="ChatBox-container"
        style={{
          // border: "1px solid blue",
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          borderRadius: "10px",
          backgroundColor:'beige',
        }}
      >
        {chat ? (
          <>
            <div className="chatHeader">
              <div
                className="follower"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                }}
              >
                {/* <div className="online-dot"></div> */}
                <div>
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
                </div>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                    {userData?.fullName}
                  </Typography>
                  {/* <Typography sx={{fontSize:'13px'}}>{userData?.username}</Typography> */}
                  {/* <Typography sx={{ fontSize: "10px" }}>Online</Typography> */}
                </Box>
              </div>
              <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
            </div>

            <div
              className="chat-body"
              // ref={scroll}
              // style={{maxHeight:'350px',overflow:'scroll' }}>
              style={{
                alignSelf: "baseline",
                maxHeight: "350px",
                minHeight: "350px",
                overflow: "scroll",
                display: "flex",
                flexDirection: "column-reverse",
              }}
            >
              {messages.map((message) => (
                <div style={{ minWidth: "350px" }}>
                  {message.senderId === currentUserId ? (
                    <div
                      className="message own"
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "column",
                        margin: "0.2rem",
                        backgroundColor: "#e1bee7",
                        borderRadius: "20px",
                        padding: "0.5rem",
                      }}
                    >
                      <span
                        style={{
                          alignSelf: "end",
                          fontSize: "14px",
                          fontWeight: "500",
                        }}
                      >
                        {message.text}
                        <br />
                      </span>
                      <span style={{ alignSelf: "end", fontSize: "10px" }}>
                        {timeAgo.format(new Date(message.createdAt))}
                      </span>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        margin: "0.2rem",
                        backgroundColor: "#c8e6c9",
                        borderRadius: "20px",
                        padding: "0.5rem",
                      }}
                      className="message"
                    >
                      <span
                        style={{
                          alignSelf: "start",
                          fontSize: "14px",
                          fontWeight: "450",
                        }}
                      >
                        {message.text}
                        <br />
                      </span>
                      <span style={{ alignSelf: "start", fontSize: "10px" }}>
                        {timeAgo.format(new Date(message.createdAt))}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-sender" style={{ display: "flex" }}>
              {/* <div>+</div> */}
              <InputEmoji value={newMessage} onChange={handleChange} />
              {/* <div className="send-button button">Send</div> */}
              <Button
                onClick={handleSend}
                variant="contained"
                color="secondary"
              >
                <Send />
              </Button>
            </div>
          </>
        ) : (
          <Typography
            className="chatbox-empty-message"
            sx={{
              alignSelf: "center",
              marginBottom: "auto",
              marginTop: "auto",
            }}
          >
            Tap on a Chat to start conversation
          </Typography>
        )}
      </div>
    </>
  );
};

export default Chatbox;
