import axios from "axios";

const instance = axios.create({
    // headers: {
    //   authorization: localStorage.getItem("userToken"),
    // },
});

instance.interceptors.request.use((req) => {
  // if (localStorage.getItem('userToken')) {
    req.headers.authorization = localStorage.getItem('userToken');
  // }
  return req;
});

export default instance;
