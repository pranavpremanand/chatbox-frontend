import axios from "axios";

// const adminAPI = axios.create({baseURL:process.env.REACT_APP_BASE_URL});
const adminAPI = axios.create({baseURL:'https://chatbox.playonsports.shop'});
// const adminAPI = axios.create({baseURL:'http://localhost:5000'});

adminAPI.interceptors.request.use((req) => {
  req.headers.authorization = localStorage.getItem("adminToken");
  return req;
});

export default adminAPI;