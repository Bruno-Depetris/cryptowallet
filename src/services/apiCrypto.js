import axios from 'axios';

const getCriptoData = (code) => {
  const url = `https://criptoya.com/api/bybit/${code}/ARS/0.1`;
  return axios.get(url);
};

export default getCriptoData;


