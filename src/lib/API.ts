import axios, { AxiosInstance } from 'axios';

export const apiUrl =
  process.env.REACT_APP_API_DEV_FLAG === 'development'
    ? <string>process.env.REACT_APP_API_URL_LOCAL
    : <string>process.env.REACT_APP_API_URL_PROD;

const API: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-type': 'application/json',
  },
});

export default API;
