import axios from "./UserAuthAPI";
export const userChats = () => axios.get("/user/chat/");
