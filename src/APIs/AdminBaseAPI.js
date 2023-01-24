import axios from 'axios'
const adminBaseURL = axios.create({baseURL:'https://chatbox.playonsports.shop'});
export default adminBaseURL