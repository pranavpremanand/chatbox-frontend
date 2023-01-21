import axios from "axios";

const userAPI = axios.create({baseURL:'https://chatbox.playonsports.shop'});
// const userAPI = axios.create({baseURL:process.env.REACT_APP_BASE_URL});
// 
userAPI.interceptors.request.use((req) => {
  // if (localStorage.getItem('userToken')) {
  req.headers.authorization = localStorage.getItem("userToken");
  // }
  return req;
});

export default userAPI;
