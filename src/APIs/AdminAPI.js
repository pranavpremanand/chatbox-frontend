import axios from "axios";

const adminAPI = axios.create({});

adminAPI.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem("adminToken");
  return req;
});

export default adminAPI;