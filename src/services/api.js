import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://billeteracryptoprojectapi-production.up.railway.app/api/',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;