import axios from "axios";

const APIuser = axios.create({ baseURL:'https://chatbox.playonsports.shop' });
// const APIuser = axios.create({ baseURL:'http://localhost:5000' });

export default APIuser;