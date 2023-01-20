import axios from "./UserAPI";

export const getNotifications = () => axios.get("/user/notifications");
export const seenAllNotifications = () => axios.get("/user/seen-notifications");
