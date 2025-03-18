import axios from 'axios';

const api = axios.create({
  baseURL: 'https://moriahmkt.com/iotapp/',
});

export default api;
