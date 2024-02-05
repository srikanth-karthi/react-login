import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080',  // Use http instead of https if your backend is not using HTTPS
});

export default instance;