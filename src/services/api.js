import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'https://billeteracryptoprojectapi-production.up.railway.app/api/',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export function getApiErrorMessage(error, fallback = 'Ocurrió un error inesperado.') {
  if (!error) {
    return fallback;
  }

  const responseData = error.response?.data;
  if (typeof responseData === 'string' && responseData.trim()) {
    return responseData;
  }

  if (responseData?.message) {
    return responseData.message;
  }

  if (error.message) {
    return error.message;
  }

  return fallback;
}

export default api;