import axios from "axios";

const instance = axios.create({
  headers: {
    authorization: "Bearer " + localStorage.getItem("userToken"),
  },
});

export default instance;
