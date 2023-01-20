import axios from "./UserAPI";
export const userChats = () => axios.get("/user/chat/");
