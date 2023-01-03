import axios from "./axios";
export const userChats = () => axios.get("/user/chat/");
