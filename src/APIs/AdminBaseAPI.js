import axios from 'axios'
// const adminBaseURL = axios.create({baseURL:'http://localhost:5000'});
const adminBaseURL = axios.create({baseURL:'https://chatbox-backend.vercel.app'});
export default adminBaseURL