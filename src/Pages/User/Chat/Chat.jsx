import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../APIs/ChatRequests";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import axios from "../../../APIs/UserAuthAPI";
import "./Chat.css";
import Conversation from "../../../Components/User/Chats/Conversation";
import Chatbox from "../../../Components/User/Chats/Chatbox";
import { io } from "socket.io-client";

const Chat = () => {
  const [user, setUser] = useState();
  //   const user = useSelector((state)=>state.user.user)
  // console.log(user,'userrrr')
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  // const socket = useRef();
  const socket = io.connect('https://chatbox-backend.vercel.app')
  // const socket = io.connect('http://localhost:5000')
  //   socket.current = io("http://localhost:8800");

  //Sending message to socket server
  useEffect(() => {
    // console.log("mounting...");
    // socket.current = io("http://localhost:5000");
    user && socket.emit("new-user-add", user?._id);
    socket.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    // return console.log("unmounting");
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

//   Receive message from socket server
useEffect(()=>{
  // if(receiveMessage!==null){
      socket.on('receive-message',(data)=>{
          setReceiveMessage(data)
      })
  // }

},[socket])

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    // console.log("mounting");
    getChats();
  }, []);
  const getChats = async () => {
    try {
      //   const response = await userChats();
      const response = await axios.get("/user/all-users");
      //   setChats(response.data.chats);
      setChats(response.data.data);
      //   setUser(response.data.user)
    } catch (err) {
      console.log(err);
    }
  };
  const createChat = async (userId) => {
    const data = {
      senderId: user?._id,
      receiverId: userId._id,
    };
    try {
      await axios.post("/user/chat", data).then(async (response) => {
        await axios
          .get("/user/chat/current-chat/" + userId._id)
          .then((response) => {
            setCurrentChat(response.data.chat);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const checkOnlineStatus = (chat) => {
    // const chatMember = chat.members.find((member)=>member!==user._id)
    const online = onlineUsers.find((user) => user.userId === chat._id);
    return online ? true : false;
  };
  return (
    <div className="Home chat_main">
      <div className="leftSide">
        <LeftSide />
      </div>
      <div
        className="chatSide"
        style={{
          backgroundColor: "whitesmoke",
          margin: "1rem",
          borderRadius: "1rem",
          padding: "5px",
        }}
      >
        <div
          className="Chat"
          style={{ marginTop: "50px", position: "relative", minHeight: "80vh" }}
        >
          <div className="Left-side-chat">
            <div
              className="Chat-list"
              style={{
                // border: "1px solid blue",
                maxHeight: "520px",
                overflow: "scroll",
                backgroundColor: "beige",
                borderRadius: "10px",
              }}
            >
              <h4 style={{ alignSelf: "center" }}>
                <u>Chats</u>
              </h4>
              {chats.map((chat) => {
                return (
                  <div onClick={() => createChat(chat)}>
                    <Conversation
                      online={checkOnlineStatus(chat)}
                      data={chat}
                      currentUserId={user?._id}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Right-side-chat">
            <Chatbox
              receiveMessage={receiveMessage}
              setSendMessage={setSendMessage}
              chat={currentChat}
              currentUserId={user?._id}
            />
          </div>
        </div>
      </div>
      <div className="rightSide">
        <RightSide />
      </div>
    </div>
  );
};

export default Chat;
