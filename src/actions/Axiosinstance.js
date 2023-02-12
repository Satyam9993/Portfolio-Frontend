import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
});
instance.defaults.headers.common['auth-token'] = localStorage.getItem('authToken');

export default instance;