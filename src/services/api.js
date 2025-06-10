import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-4c64c859-2a17-46c6-be9f-a7f6f5005e79.cleverapps.io/api/',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;