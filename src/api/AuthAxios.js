import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const baseURL = process.env.REACT_APP_API_AXIOS

const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create  user instance
let axiosJWT = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosJWT.interceptors.request.use(function (config) {
    const token = cookies.get('accessToken')
    console.log(token,'headerToken');
    config.headers.accessToken = token;
    return config;
});

export default axiosJWT;