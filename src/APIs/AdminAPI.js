import axios from "axios";

// const adminAPI = axios.create({baseURL:process.env.REACT_APP_BASE_URL});
const adminAPI = axios.create({baseURL:'https://chatbox.playonsports.shop'});

adminAPI.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem("adminToken");
  return req;
});

export default adminAPI;