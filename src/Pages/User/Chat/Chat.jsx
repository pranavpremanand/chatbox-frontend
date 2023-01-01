import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../../APIs/ChatRequests";
import LeftSide from "../../../Components/User/Home/LeftSide/LeftSide";
import RightSide from "../../../Components/User/Home/RightSide/RightSide";
import axios from "../../../APIs/axios";
import "./Chat.css";
import Conversation from "../../../Components/User/Chats/Conversation";
import Chatbox from "../../../Components/User/Chats/Chatbox";
const Chat = () => {
  const [user, setUser] = useState();
  const [chats, setChats] = useState([]);
  const [currentChat,setCurrentChat]=useState(null)
  useEffect(() => {
    getChats();
  }, []);
  const getChats = async () => {
    try {
      const response = await userChats();
      // const response = await axios.get('/')
      setChats(response.data.chats);
      setUser(response.data.userId)
    //   console.log(response.data, "CHAT DATA");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="Home">
      <div className="profileSide">
        <LeftSide />
      </div>
      <div className="postSide">
        <div className="Chat">
          <div className="Left-side-chat">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat) => {
                  return<div onClick={()=>setCurrentChat(chat)}>
                    <Conversation data={chat} currentUserId={user}/>
                    </div>
              })}
            </div>
          </div>
          <div className="Right-side-chat">
            {/* <div style={{}}></div> */}
            <Chatbox chat={currentChat} currentUserId={user}/>
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
