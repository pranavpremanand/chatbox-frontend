import axios from "axios";

const userAPI = axios.create({});

userAPI.interceptors.request.use((req) => {
  // if (localStorage.getItem('userToken')) {
  req.headers.authorization = localStorage.getItem("userToken");
  // }
  return req;
});

export default userAPI;
