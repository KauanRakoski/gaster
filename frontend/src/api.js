import axios from '../node_modules/axios';

const api = axios.create({
    baseURL: "https://gaster.onrender.com"
});


export default api;