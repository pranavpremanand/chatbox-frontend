import axios from "./axios";

export const getNotifications = () => axios.get("/user/notifications");
export const seenAllNotifications = () => axios.get("/user/seen-notifications");
