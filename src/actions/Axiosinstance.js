import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
    baseURL: `${BACKEND_URL}/api`,
    timeout: 5000,
});
instance.defaults.headers.common['auth-token'] = localStorage.getItem('authToken');

export default instance;