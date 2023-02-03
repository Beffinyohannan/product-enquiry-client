import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_AXIOS,
    headers: {
        "Content-Type": "application/json",
    }
})

axios.interceptors.request.use(function (config) {
    const token = cookies.get('accessToken')
    config.headers.accesstoken = token;
    return config;
});

